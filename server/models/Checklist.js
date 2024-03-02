const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema({
    name: String,
    isEditing: Boolean,
});

module.exports = mongoose.model('Checklist', checklistSchema);
