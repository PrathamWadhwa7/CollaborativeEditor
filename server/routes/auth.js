const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const users=require('../models/users');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware');

router.get('/:id',authenticate,async(req,res)=>{
    try{
    const id = req.params.id;
    console.log(id);
    const userResponse = await users.findById(id);
    console.log(userResponse);
    res.status(200).json(userResponse);
    }
    catch(e)
    {
        console.log("can't fetch user from database!",e);
    }
})

//Register
router.post('/signup',async(req,res)=>{
    try {
        const { email, password , userName } = req.body;
        const existingUser = await users.findOne({ email:email});
        
        if (existingUser) {
            console.log('User already exists:', email);
            return res.status(400).json({ message: 'User already existed!' });
        }
        const hashedPassword = await bcrypt.hash(password,7);
        const newUser = new users({userName,email,password:hashedPassword});
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
        
    } catch (e) {
        console.error('Error in /signup:', e);
        res.status(500).json({ message: 'Server Error!' });
    }


})

//login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await users.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ email: user.email, id: user._id }, 'secret', { expiresIn: '1h' });
        console.log(token);
        res.status(200).json({ result: user, token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});





module.exports = router