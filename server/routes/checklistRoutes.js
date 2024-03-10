const express = require('express');
const router = express.Router();
const Checklist = require('../models/Checklist');
const DaySummary = require('../models/DaySummary')

function getTodayDate(){
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
}

router.get('/', async (req, res) => {
    try {
        let checklist = await Checklist.find();

        checklist = await Promise.all(checklist.map(async (item) => {
            if (item.doneDate !== getTodayDate()) {
                item.doneDate = null;
                item.isDone = false;
                await item.save(); 
            }
            return item;
        }));

        res.json(checklist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const checklist = new Checklist({
            name: req.body.name,
            isEditing: req.body.isEditing,
            isDone: req.body.isDone,
            doneDate: req.body.doneDate
        });
        const daySummaryId = req.body.summaryId;
        const daySummary = await DaySummary.findById(daySummaryId);
        if (daySummary == null) {
            return res.status(404).json({ message: 'Day summary not found' });
        }
        daySummary.checklistsAmount = (daySummary.checklistsAmount || 0) + 1;
        
        const newChecklistk = await checklist.save();
        await daySummary.save();
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
        checklist.isDone = req.body.isDone;
        if(req.body.doneDate) {
            checklist.doneDate = getTodayDate();
        } else{
            checklist.doneDate = null;
        }
        const updatedChecklist = await checklist.save();
        res.json(updatedChecklist);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.post('/del', async (req, res) => {
    const checklistItemId = req.body.id;
    try {
        const deleteChecklistItemId = await Checklist.deleteOne({_id:checklistItemId});
        if (deleteChecklistItemId == null) {
            return res.status(404).json({ message: 'Checklist Item not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
