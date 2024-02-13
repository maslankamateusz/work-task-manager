const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: String,
    date: String,
    nonFormattedDate: String,
    status: String,
    color: String
});

module.exports = mongoose.model('Task', taskSchema);
