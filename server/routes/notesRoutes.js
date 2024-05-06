const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');


router.get('/', async (req, res) => {
    try {
        const notes = await Notes.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { text } = req.body;
        let notes = await Notes.findOne();

        if (notes) {
            notes.text = text;
        } else {
            notes = new Notes({ text });
        }

        const savedNotes = await notes.save(); 
        res.status(200).json(savedNotes); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;
