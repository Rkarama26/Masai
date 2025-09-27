const { readDB, writeDB } = require("../models/todoModel");

// Get all todos
exports.getTodos = (req, res) => {
  const db = readDB();
  res.json(db.todos);
};

// Add new todo
exports.addTodo = (req, res) => {
  const db = readDB();
  const { title, completed } = req.body;

  if (!title) return res.status(400).json({ error: "Title is required" });

  const newTodo = {
    id: db.todos.length ? db.todos[db.todos.length - 1].id + 1 : 1,
    title,
    completed: completed || false,
  };

  db.todos.push(newTodo);
  writeDB(db);

  res.status(201).json(newTodo);
};

// Search todos by query
exports.searchTodos = (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);

  const db = readDB();
  const results = db.todos.filter(todo =>
    todo.title.toLowerCase().includes(q.toLowerCase())
  );

  res.json(results);
};

// Update todo by ID
exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const db = readDB();
  const todo = db.todos.find(t => t.id === parseInt(id));

  if (!todo) return res.status(404).json({ error: "Todo not found" });

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  writeDB(db);
  res.json(todo);
};

// Delete todo by ID
exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  const db = readDB();

  const index = db.todos.findIndex(t => t.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: "Todo not found" });

  const deleted = db.todos.splice(index, 1);
  writeDB(db);

  res.json({ message: "Todo deleted", deleted });
};
