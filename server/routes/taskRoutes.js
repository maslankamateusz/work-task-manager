const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const task = new Task({
        name: req.body.name,
        date: req.body.date,
        nonFormattedDate: req.body.nonFormattedDate,
        status: req.body.status,
        color: req.body.color
    });
    try {
        const newTask = await task.save();
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

router.delete('/:id', async (req, res) => {
    try {
        const deleteTask = await Task.deleteOne({_id:req.params.id});
        if (deleteTask == null) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;
