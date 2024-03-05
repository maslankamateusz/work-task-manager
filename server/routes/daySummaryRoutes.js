const express = require('express');
const router = express.Router();
const DaySummary = require('../models/DaySummary');

router.get('/', async (req, res) => {
    const today = new Date();
    
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;

    try {
        let entry = await DaySummary.findOne({ date: formattedDate });
        if (!entry) {
            entry = new DaySummary({ date: formattedDate });
            entry = await entry.save();
        }
        res.json(entry);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Wystąpił błąd serwera' });
    }
});

router.post('/checklistsummary', async (req, res) => {
    try {
        const daySummary = await DaySummary.findById(req.body.summaryId);
        if (!daySummary) {
            return res.status(404).json({ message: 'Day summary not found' });
        }
        daySummary.checklistsAmount = req.body.checklistAmount;
        await daySummary.save();
        res.json(daySummary);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

router.post('/checklistdone', async (req, res) => {
    const checkItemDone = req.body.checkItemDone;
    const summaryId = req.body.summaryId;
    try {
        const daySummary = await DaySummary.findById(summaryId);
        if (!daySummary) {
            return res.status(404).json({ message: 'Day summary not found' });
        }
        if(checkItemDone){
            daySummary.checklistsCompleted = daySummary.checklistsCompleted + 1;
        } else{
            daySummary.checklistsCompleted = daySummary.checklistsCompleted - 1;
        }
        await daySummary.save();
        res.json(daySummary);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
