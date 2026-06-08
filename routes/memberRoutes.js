const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

// POST /api/members/register - Register a new gym member
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, age, membershipType, goal } = req.body;

    // Check if email already exists
    const existing = await Member.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already registered.' });
    }

    const member = new Member({ name, email, phone, age, membershipType, goal });
    await member.save();

    res.status(201).json({
      success: true,
      message: 'Registration successful! Our team will contact you shortly.',
      data: member
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// GET /api/members - Get all members (for gym owner)
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ registeredAt: -1 });
    res.json({ success: true, count: members.length, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
