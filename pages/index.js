const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/login.html'));
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Basic authentication logic
  if (username === 'admin' && password === 'password') {
    res.redirect('/webhook');
  } else {
    res.send('Invalid credentials');
  }
});

module.exports = router;
