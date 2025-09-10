const TodoController = require('../controllers/TodoController');
const express = require('express');
const router = express.Router();
const { authRequired, authorizeRole } = require('../middleware/authMiddleware');

// Create a new todo
router.post('/', authRequired, TodoController.createTodo);

// Get all todos
router.get('/', authRequired, TodoController.getTodos);

// Update a todo
router.put('/:id', authRequired, TodoController.updateTodo);

// Delete a todo
router.delete('/:id', authRequired, authorizeRole('admin'), TodoController.deleteTodo);

module.exports = router;