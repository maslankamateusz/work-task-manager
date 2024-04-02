const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const taskRoutes = require('./routes/taskRoutes');
const checklistRoutes = require('./routes/checklistRoutes');
const daySummary = require('./routes/daySummaryRoutes');

app.use(cors());

const PORT = 5000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/work-task-manager', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB database');
});

app.use('/api/tasks', taskRoutes);
app.post('/api/tasks', taskRoutes);
app.put('/api/tasks', taskRoutes);
app.post('/api/tasks', taskRoutes);


app.use('/api/checklist', checklistRoutes);
app.post('/api/checklist', checklistRoutes);
app.put('/api/checklist', checklistRoutes);
app.post('/api/checklist', checklistRoutes);

app.use('/api/daysummary', daySummary);
app.post('/api/daysummary', daySummary);
app.post('/api/daysummary', daySummary);
app.post('/api/daysummary', daySummary);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
