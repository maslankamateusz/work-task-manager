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
         }
        res.json(entry);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Wystąpił błąd serwera' });
    }
});



router.get('/timersdata', async (req, res) => {
    const formattedDate = getTodayDate();

    try {
        let entry = await DaySummary.findOne({ date: formattedDate });
        if (!entry) {
            entry = new DaySummary({ date: formattedDate });
            entry = await entry.save();
         }
        res.json(entry.timers);
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

router.post('/dailymeasurements', async (req, res) => {
    
     try {
        const daySummaryId = req.body.summaryId;
        const bodyweight = req.body.bodyweight;
        const sleepDuration = req.body.sleepDuration;

        if (!daySummaryId) {
            return res.status(400).json({ message: 'Invalid request. SummaryId is required.' });
        }
        const daySummary = await DaySummary.findById(daySummaryId);
        if (!daySummary) {
            return res.status(404).json({ message: 'Day summary not found' });
        }
        if (bodyweight) {
             daySummary.bodyweight = bodyweight;
        }
        if (sleepDuration) {
            daySummary.sleepDuration = sleepDuration;
        }
        const updatedSummary = await daySummary.save();
        res.status(200).json(updatedSummary);
    } catch (err) {
         res.status(400).json({ message: err.message });
     }
});

router.post('/additionalNotes', async (req, res) => {
    try{
        const additionalNotes = req.body.newNotes;
        const daySummaryId = req.body.summaryId;

        if (!daySummaryId) {
            return res.status(400).json({ message: 'Invalid request. SummaryId is required.' });
        }
        const daySummary = await DaySummary.findById(daySummaryId);
        if (!daySummary) {
            return res.status(404).json({ message: 'Day summary not found' });
        }
        if (additionalNotes) {
             daySummary.additionalNotes = additionalNotes;
        }
        const updatedSummary = await daySummary.save();
        res.status(200).json(updatedSummary);

    }catch(err){
        res.status(400).json({message: err.message})
    }
});

router.post('/timers', async (req, res) => {
    try {
        const formattedDate = getTodayDate();
        const daySummary = await DaySummary.findOne({ date: formattedDate });

        if (!daySummary) {
            return res.status(404).json({ message: 'Day summary not found for the current date' });
        }

        if (req.body.timerKey === undefined || req.body.elapsedTime === undefined || req.body.rotationTime === undefined) {
            return res.status(400).json({ message: 'timerKey, elapsedTime, and rotationTime are required' });
        }
        

        const timerKey = req.body.timerKey;
        const elapsedTime = req.body.elapsedTime;
        const rotationTime = req.body.rotationTime;

        if (typeof timerKey !== 'number' || timerKey < 0 || timerKey >= daySummary.timers.length) {
            return res.status(400).json({ message: 'Invalid timerKey' });
        }

        await DaySummary.updateOne(
            { _id: daySummary._id }, 
            { 
                $set: { 
                    [`timers.${timerKey}.durationTime`]: elapsedTime,
                    [`timers.${timerKey}.rotationTime`]: rotationTime
                } 
            } 
        );

        res.status(200).json({ message: 'Timer updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});







module.exports = router;
