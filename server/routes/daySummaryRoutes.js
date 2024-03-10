const express = require('express');
const router = express.Router();
const DaySummary = require('../models/DaySummary');

function getTodayDate(){
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
}

router.get('/', async (req, res) => {
    const formattedDate = getTodayDate();

    try {
        let entry = await DaySummary.findOne({ date: formattedDate });
        if (!entry) {
            entry = new DaySummary({ date: formattedDate });
            entry = await entry.save();
        } else {
            const checklistsCount = await Checklist.countDocuments({ daySummaryId: entry._id });

            if (checklistsCount > 30) {
                const lastChecklist = await Checklist.findOne({ daySummaryId: entry._id }).sort({ _id: -1 });
                if (lastChecklist) {
                    await lastChecklist.remove();
                }
            }
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

        if (checkItemDone) {
            daySummary.checklistsCompleted++;
        } else {
            if (daySummary.checklistsCompleted > 0) {
                daySummary.checklistsCompleted--;
            } else {
                daySummary.checklistsCompleted = 0;
            }
        }

        await daySummary.save();
        res.json(daySummary);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
