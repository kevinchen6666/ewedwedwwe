const express = require('express');
const app = express();
const path = require('path');

// In-memory user store (you can use a real database in production)
let users = [];

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS) from the "pages" and "styles" directory
app.use(express.static(path.join(__dirname, 'pages')));
app.use(express.static(path.join(__dirname, 'styles')));

// Login page route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/login.html'));
});

// Login POST route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    res.redirect('/webhook');
  } else {
    res.send('Invalid credentials. Please try again.');
  }
});

// Signup page route
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/signup.html'));
});

// Signup POST route
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find(user => user.username === username);

  if (existingUser) {
    res.send('Username already exists. Please choose another one.');
  } else {
    users.push({ username, password });
    res.send('Sign-up successful. Now you can login.');
  }
});

// Webhook page route (you can add this part if necessary for the webhook functionality)
app.get('/webhook', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/webhook.html'));
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

module.exports = app;
