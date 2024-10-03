const express = require('express');
const router = express.Router();
const path = require('path');

// Import the shared user store from index.js
const users = require('./index').users;

router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/signup.html'));
});

router.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Check if the username is already taken
  const existingUser = users.find(user => user.username === username);
  
  if (existingUser) {
    res.send('Username already exists. Please choose another one.');
  } else {
    // Add new user to the in-memory store
    users.push({ username, password });
    res.send('Sign-up successful. Now you can login.');
  }
});

module.exports = router;
