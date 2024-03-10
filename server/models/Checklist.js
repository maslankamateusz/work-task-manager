const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema({
    name: String,
    isEditing: Boolean,
    isDone: Boolean,
    doneDate: String
});

module.exports = mongoose.model('Checklist', checklistSchema);
