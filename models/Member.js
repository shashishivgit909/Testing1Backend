const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [10, 'Age must be at least 10'],
    max: [100, 'Age must be under 100']
  },
  membershipType: {
    type: String,
    enum: ['Basic', 'Standard', 'Premium'],
    default: 'Basic'
  },
  goal: {
    type: String,
    trim: true
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
},{timestamps:true});

module.exports = mongoose.model('Member', memberSchema);
