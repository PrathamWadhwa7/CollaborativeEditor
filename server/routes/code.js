const express = require('express');
const router = express.Router();
const codeSnippet = require('../models/codeSnippet');
const authenticate = require('../middleware');



router.post('/save', async (req, res) => {
    const { code, ownerId } = req.body;
    console.log("message:",code,"\nowner:",ownerId,"is saving to db!");
    try {
        const newSnippet = new codeSnippet({ code, owner: ownerId });
        await newSnippet.save();
        res.status(201).json(newSnippet);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/clear',async(req,res)=>{
    try {
        await codeSnippet.deleteMany({});
        
        res.status(200).json({message:'deleted old data!'});
        
    } catch (error) {
        res.status(500).json({message:"Server Error!"});
    }
})


router.get('/',authenticate,async(req,res)=>{
    try {
        const snippets = await codeSnippet.find();
        res.status(200).json(snippets);
        
    } catch (error) {
        res.status(500).json(`server error! ${error}`);
    }
})









module.exports = router