const mongoose = require('mongoose');

const timersSchema = new mongoose.Schema({
    timers: {
        type: Array,
        default: [
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
        ]
    }
});

const Timers = mongoose.model('Timers', timersSchema);

module.exports = Timers;
