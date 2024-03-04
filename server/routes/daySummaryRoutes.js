const express = require('express');
const router = express.Router();
const DaySummary = require('../models/DaySummary');

router.use('/', async (req, res) => {
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
        return;
    }

});

module.exports = router;
