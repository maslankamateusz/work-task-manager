const express = require('express');
const router = express.Router();
const Checklist = require('../models/Checklist');

router.get('/', async (req, res) => {
    try {
        const checklist = await Checklist.find();
        res.json(checklist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const checklist = new Checklist({
        name: req.body.name,
        isEditing: req.body.isEditing
    });
    try {
        const newChecklistk = await checklist.save();
        res.status(201).json(newChecklistk);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const checklist = await Checklist.findById(req.params.id);
        if (checklist == null) {
            return res.status(404).json({ message: 'Checklist item not found' });
        }
        checklist.name = req.body.name;
        checklist.isEditing = req.body.isEditing;
        const updatedChecklist = await checklist.save();
        res.json(updatedChecklist);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const deleteChecklistItem = await Checklist.deleteOne({_id:req.params.id});
        if (deleteChecklistItem == null) {
            return res.status(404).json({ message: 'ChecklistItem not found' });
        }
        res.json({ message: 'ChecklistItem deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.put('/', async (req, res) => {
    try {
        // Usuwanie wszystkich istniejących elementów z kolekcji
        await Checklist.deleteMany({});

        // Przekształcenie elementów przekazanych w żądaniu na obiekty typu Checklist
        const checklistObjects = req.body.map(item => ({
            name: item.name,
            isEditing: item.isEditing
        }));

        // Zapisanie nowej kolekcji do bazy danych
        await Checklist.insertMany(checklistObjects);

        res.json({ message: 'Checklist collection updated successfully' });
    } catch (error) {
        console.error('Error updating checklist collection:', error);
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
