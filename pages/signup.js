const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/signup.html'));
});

router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  // You can implement a real sign-up logic here
  res.send('Sign-up successful');
});

module.exports = router;
