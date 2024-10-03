const express = require('express');
const router = express.Router();
const path = require('path');

// In-memory user store (replace with a database in production)
let users = [];

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/login.html'));
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if user exists in the stored users
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    // Successful login, redirect to the webhook page
    res.redirect('/webhook');
  } else {
    // Failed login, prompt the user to try again
    res.send('Invalid credentials. Please try again.');
  }
});

// Export the users array for use in signup.js
exports.users = users;
module.exports = router;
