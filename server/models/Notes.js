const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
}});


const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;