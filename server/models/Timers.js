const mongoose = require('mongoose');

const timersSchema = new mongoose.Schema({
    timers: {
        type: Array,
        default: [
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
        ]
    }
});

const Timers = mongoose.model('Timers', timersSchema);

module.exports = Timers;
