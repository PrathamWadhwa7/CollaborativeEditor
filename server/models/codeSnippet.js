const mongoose = require('mongoose');

const codeSnippetSchema = mongoose.Schema({
    code: { type: String, },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('CodeSnippet', codeSnippetSchema);
