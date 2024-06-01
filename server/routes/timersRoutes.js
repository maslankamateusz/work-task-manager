const express = require('express');
const router = express.Router();
const Timers = require('../models/Timers');

router.get('/', async (req, res) => {

    try {
        let entry = await Timers.findOne();
        if (!entry || !entry.timers || entry.timers.length === 0) {
            entry = new Timers([
                {
                    timerName: "Work",
                    rotationTime: 3600,
                    timerColor: "007bff"
                },
                {
                    timerName: "School",
                    rotationTime: 3600,
                    timerColor: "007bff"
                },
                {
                    timerName: "Learn",
                    rotationTime: 3600,
                    timerColor: "007bff"
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
                    [`timers.${index}.rotationTime`]: newRotationTime * 60,
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

module.exports = router;
