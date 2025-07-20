
const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleComplete,
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware'); // ✅ Add this line

// Protected routes
router.get('/', authMiddleware, getTasks);
router.post('/', authMiddleware, createTask);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);
router.patch('/:id/complete', authMiddleware, toggleComplete); // ✅ This one needed it too

module.exports = router;

