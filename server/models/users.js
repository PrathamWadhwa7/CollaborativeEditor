const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName:{type:String,require:true,unique:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
