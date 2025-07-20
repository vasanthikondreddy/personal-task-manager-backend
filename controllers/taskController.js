// const Task = require('../models/Task');

// exports.getTasks = async (req, res) => {
//   const tasks = await Task.find({ userId: req.user.id });
//   res.json(tasks);
// };

// exports.createTask = async (req, res) => {
//   const { title } = req.body;
//   const task = new Task({ userId: req.user.id, title });
//   await task.save();
//   res.status(201).json(task);
// };

// exports.updateTask = async (req, res) => {
//   const { id } = req.params;
//   const { title, completed } = req.body;
//   const task = await Task.findByIdAndUpdate(id, { title, completed }, { new: true });
//   res.json(task);
// };

// exports.deleteTask = async (req, res) => {
//   const { id } = req.params;
//   await Task.findByIdAndDelete(id);
//   res.json({ message: 'Task deleted' });
// };


const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      userId: req.user.id
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
// Toggle task completion
exports.toggleComplete = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.completed = !task.completed;
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

