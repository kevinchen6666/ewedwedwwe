const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');

// In-memory user store
let users = [];

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (HTML, CSS) from the "pages" and "styles" directory
app.use(express.static(path.join(__dirname, 'pages')));
app.use(express.static(path.join(__dirname, 'styles')));

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
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

module.exports = app;
