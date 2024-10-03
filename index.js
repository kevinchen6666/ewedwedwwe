const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

// In-memory user store
let users = [];

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (HTML, CSS) from the "pages" and "styles" directories
app.use(express.static(path.join(__dirname, 'pages')));
app.use(express.static(path.join(__dirname, 'styles')));

// Root route - serve the login page
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

// Webhook page route
app.get('/webhook', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/webhook.html'));
});

// Route to handle POST request to send the webhook
app.post('/send-webhook', (req, res) => {
  const { webhookUrl, message } = req.body;

  if (!webhookUrl || !message) {
    return res.status(400).send('Webhook URL and message are required.');
  }

  // Send a POST request to the provided webhook URL
  axios.post(webhookUrl, {
    content: message
  })
  .then(response => {
    res.send('Webhook sent successfully!');
  })
  .catch(error => {
    res.status(500).send('Failed to send the webhook. Please check the URL and try again.');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
