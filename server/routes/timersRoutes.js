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
                },
                {
                    timerName: "School",
                    rotationTime: 3600,
                },
                {
                    timerName: "Learn",
                    rotationTime: 3600,
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

module.exports = router;
