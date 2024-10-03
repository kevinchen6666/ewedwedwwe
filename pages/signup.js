const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/signup.html'));
});

router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  // Sign-up logic here (store user credentials in a real database)
  res.send('Sign-up successful. Now you can login.');
});

module.exports = router;
