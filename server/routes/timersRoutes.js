const express = require('express');
const router = express.Router();
const Timers = require('../models/Timers');

router.get('/', async (req, res) => {

    try {
        let entry = await Timers.findOne();
        if (!entry || !entry.timers || entry.timers.length === 0) {
            await Timers.deleteMany({});
            entry = new Timers([
                {
                    timerName: "Work",
                    rotationTime: 3600,
                    timerColor: "#007bff"
                },
                {
                    timerName: "School",
                    rotationTime: 3600,
                    timerColor: "#007bff"
                },
                {
                    timerName: "Learn",
                    rotationTime: 3600,
                    timerColor: "#007bff"
                }
            ]);
            entry = await entry.save();
         }
        res.json(entry);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Wystąpił błąd serwera' });
    }
});

router.post('/update', async (req, res) => {
    try {
        const timers = await Timers.findOne();
        if (!timers) {
            return res.status(404).json({ message: 'Timers not found' });
        }
        index = req.body.timerKey;
        newName = req.body.timerName;
        newRotationTime = req.body.rotationTime;
        newColor = req.body.timerColor;

        if (index === undefined || newRotationTime === undefined) {
            return res.status(400).json({ message: 'timerKey and rotationTime are required' });
        }

        const response = await Timers.updateOne(
            { _id: timers._id }, 
            { 
                $set: { 
                    [`timers.${index}.timerName`]: newName,
                    [`timers.${index}.rotationTime`]: newRotationTime,
                    [`timers.${index}.timerColor`]: newColor,
                } 
            } 
        );
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

router.delete('/delete', async (req, res) => {
    try {
        const timers = await Timers.findOne();

        if (!timers) {
            return res.status(404).json({ message: 'Timers not found' });
        }

        const index = req.body.timerKey;

        if (index === undefined) {
            return res.status(400).json({ message: 'timerKey is required' });
        }

        if (index < 0 || index >= timers.timers.length) {
            return res.status(400).json({ message: 'Invalid timerKey' });
        }

        timers.timers.splice(index, 1);
        await timers.save();

        res.json({ message: 'Timer deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

router.post('/add', async (req, res) => {
    try {
        const timers = await Timers.findOne();
        if (!timers) {
            return res.status(404).json({ message: 'Timers not found' });
        }
        
        const newTimer = {
            timerName: "Add name",
            rotationTime: 3600,
            timerColor: "#007bff"
        };

        timers.timers.push(newTimer);
        await timers.save();

        res.json({ message: 'Timer added successfully', newTimer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
