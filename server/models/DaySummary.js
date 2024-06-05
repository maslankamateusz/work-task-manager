const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        unique: true
    },
    tasksAdded: {
        type: Number,
        default: 0
    },
    tasksCompleted: {
        type: Number,
        default: 0
    },
    checklistsAmount: {
        type: Number,
        default: 0
    },
    checklistsCompleted: {
        type: Number,
        default: 0
    },
    bodyweight: {
        type: Number,
    },
    sleepDuration: {
        type: String,
    },
    additionalNotes: {
        type: Object,
    },
    timers: {
        type: Array,
        default: [
            {
                rotationTime: 3600,
                durationTime: 0
            },
            {
                rotationTime: 3600,
                durationTime: 0
            },
            {
                rotationTime: 3600,
                durationTime: 0
            }
        ]
    }
});

const DaySummary = mongoose.model('DaySummary', daySchema);

module.exports = DaySummary;
