const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact - Submit a contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Message received! We will get back to you within 24 hours.'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// GET /api/contact - Get all contact messages (for gym owner)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ submittedAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
