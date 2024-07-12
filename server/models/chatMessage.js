const mongoose = require('mongoose');

const chatMessageSchema = mongoose.Schema({
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
