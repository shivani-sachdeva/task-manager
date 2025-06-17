const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

let tasks = [];
let currId = 1;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running!');
});

// GET all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST new task
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Invalid title' });
    }
    const newTask = { id: currId++, title, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

//DELETE existing task
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== id);
    res.status(204).send();
});

//START server
app.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});

// PUT update task title or completed status
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { completed, title } = req.body;
  const task = tasks.find(t => t.id == id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  if (typeof completed === 'boolean') {
    task.completed = completed;
  }
  if (typeof title === 'string' && title.length > 0) {
    task.title = title.trim();
  }
  res.json(task);
});