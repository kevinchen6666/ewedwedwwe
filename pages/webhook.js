const express = require('express');
const axios = require('axios');
const router = express.Router();
const path = require('path');

router.get('/webhook', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/webhook.html'));
});

router.post('/send-webhook', async (req, res) => {
  const { webhookUrl, message } = req.body;

  try {
    await axios.post(webhookUrl, {
      content: message,
    });
    res.send('Webhook sent to Discord successfully!');
  } catch (error) {
    res.send('Failed to send the webhook. Please check the URL.');
  }
});

module.exports = router;
