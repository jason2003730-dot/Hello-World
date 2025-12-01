const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Cookie Session
app.use(session({
  name: 'todoSession',
  keys: ['secretkey1', 'secretkey2'],
  maxAge: 24 * 60 * 60 * 1000
}));

// MongoDB connects
mongoose.connect('mongodb+srv://s1413790_db_user:s1413790@cluster0.uorgnt3.mongodb.net/?appName=Cluster0');

// Data models
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
  dueDate: Date,
  userId: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (req.session.authenticated) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Routes
app.get('/', requireAuth, (req, res) => {
  res.redirect(`/todos/${req.session.userId}`);
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  const user = await User.findOne({ username, password });
  if (user) {
    req.session.authenticated = true;
    req.session.username = username;
    req.session.userId = user._id.toString();
    res.redirect(`/todos/${user._id}`);
  } else {
    res.render('login', { error: 'Invalid username or password' });
  }
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  
  if (!username || !password) {
    return res.render('register', { 
      error: 'Please fill all columns',
      username: username || ''
    });
  }
  
  if (password !== confirmPassword) {
    return res.render('register', { 
      error: 'Passwords do not match',
      username: username
    });
  }
  
  if (username.length < 3 || username.length > 20) {
    return res.render('register', { 
      error: 'Username must be 3-20 characters',
      username: username
    });
  }
  
  if (password.length < 6) {
    return res.render('register', { 
      error: 'Password must be at least 6 characters',
      username: username
    });
  }
  
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.render('register', { 
      error: 'Username already exists',
      username: username
    });
  }
  
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    
    res.render('login', { 
      success: 'Registration successful! Please login.'
    });
    
  } catch (error) {
    res.render('register', { 
      error: 'Registration failed',
      username: username
    });
  }
});

app.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/login');
});

app.get('/todos', requireAuth, (req, res) => {
  res.redirect(`/todos/${req.session.userId}`);
});

app.get('/todos/:userId', requireAuth, async (req, res) => {
  try {
    if (req.params.userId !== req.session.userId) {
      return res.status(403).send('Access denied');
    }
    
    const todos = await Todo.find({ userId: req.session.userId }).sort({ createdAt: -1 });
    res.render('index', {
      todos, 
      username: req.session.username,
      userId: req.session.userId
    });
  } catch (error) {
    res.render('index', {
      todos: [],
      username: req.session.username,
      userId: req.session.userId
    });
  }
});

app.post('/todos', requireAuth, async (req, res) => {
  const { title, description } = req.body;
  
  try {
    await new Todo({
      title,
      description,
      completed: false,
      userId: req.session.userId
    }).save();
    
    res.redirect(`/todos/${req.session.userId}`);
  } catch (error) {
    res.redirect(`/todos/${req.session.userId}`);
  }
});

app.post('/todos/:id/toggle', requireAuth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ 
      _id: req.params.id, 
      userId: req.session.userId 
    });
    
    if (todo) {
      todo.completed = !todo.completed;
      await todo.save();
    }
    
    res.redirect(`/todos/${req.session.userId}`);
  } catch (error) {
    res.redirect(`/todos/${req.session.userId}`);
  }
});

app.post('/todos/:id/delete', requireAuth, async (req, res) => {
  try {
    await Todo.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.session.userId 
    });
    
    res.redirect(`/todos/${req.session.userId}`);
  } catch (error) {
    res.redirect(`/todos/${req.session.userId}`);
  }
});

app.get('/todos/:id/edit', requireAuth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ 
      _id: req.params.id, 
      userId: req.session.userId 
    });
    
    if (!todo) {
      return res.status(404).send('Todo not found');
    }
    
    res.render('todo-edit', { 
      todo,
      userId: req.session.userId
    });
  } catch (error) {
    res.redirect(`/todos/${req.session.userId}`);
  }
});

app.post('/todos/:id/edit', requireAuth, async (req, res) => {
  const { title, description } = req.body;
  
  try {
    await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.session.userId },
      { title, description }
    );
    
    res.redirect(`/todos/${req.session.userId}`);
  } catch (error) {
    res.redirect(`/todos/${req.session.userId}`);
  }
});

// RESTful APIs
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

app.get('/api/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const todos = await Todo.find({ userId: userId }).sort({ createdAt: -1 });
    
    if (todos.length === 0) {
      return res.status(404).json({ 
        message: 'No todos found for this user',
        todos: []
      });
    }
    
    res.json({
      userId: userId,
      count: todos.length,
      todos: todos
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user todos' });
  }
});

app.get('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
});

app.post('/api/todos', async (req, res) => {
  try {
    const { title, description, completed, userId } = req.body;
    
    const todo = await new Todo({
      title,
      description: description || "",
      completed: completed || false,
      userId: userId
    }).save();
    
    res.status(201).json({
      message: 'Todo created successfully',
      todo: todo
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

app.put('/api/todos/:id', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true }
    );
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Server start
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});