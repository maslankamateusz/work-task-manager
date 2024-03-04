const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const DaySummary = require('../models/DaySummary');

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const task = new Task({
            name: req.body.name,
            date: req.body.date,
            nonFormattedDate: req.body.nonFormattedDate,
            status: req.body.status,
            color: req.body.color
        });

        const daySummaryId = req.body.summaryId;
        
        const daySummary = await DaySummary.findById(daySummaryId);
        if (daySummary == null) {
            return res.status(404).json({ message: 'Day summary not found' });
        }
        daySummary.tasksAdded = (daySummary.tasksAdded || 0) + 1;

        const newTask = await task.save();
        await daySummary.save();
        
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.name = req.body.name;
        task.date = req.body.date;
        task.nonFormattedDate = req.body.nonFormattedDate;
        task.status = req.body.status;
        task.color = req.body.color;
        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.post('/del', async (req, res) => {
    try {
        const taskid = req.body.id;
        const daySummaryId = req.body.summaryId;

        const deleteTask = await Task.deleteOne({ _id: taskid });
        if (deleteTask.deletedCount === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const daySummary = await DaySummary.findById(daySummaryId);
        if (daySummary == null) {
            return res.status(404).json({ message: 'Day summary not found' });
        }
        daySummary.tasksCompleted = (daySummary.tasksAdded || 0) + 1;
        await daySummary.save();

        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


module.exports = router;
