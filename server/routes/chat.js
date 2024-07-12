const express = require('express');
const router = express.Router();
const chatMessage = require('../models/chatMessage');
const isLoggedIn=require('../middleware');

// Get all chat messages
router.get('/', async (req, res) => {
    try {
        const messages = await chatMessage.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/',async(req,res)=>{
    // try {
    //     const { message,sender } = req.body;
    //     const newChat= new chatMessage({
    //         message:message,sender:sender
    //     })
    //     await newChat.save();
    //     res.status(201).json("message posted successfully!");

    // } catch (e) {
    //     res.status(500).json("Server Error!:",e);
    // }
    try {
        const { message, sender } = req.body;
        if (!message || message.trim() === '') {
            return res.status(400).json({ message: 'Message is required' });
          }
        const newChat = new chatMessage({
            message: message,
            sender: sender
        });
        await newChat.save();
        await newChat.populate('sender', 'userName');
        res.status(201).json({ message: "Message posted successfully!",data:newChat });
    } catch (e) {
        console.error('Error:', e); // Log the error to the console for debugging
        res.status(500).json({ message: "Server Error!", error: e.message });
    }
})

module.exports = router;
