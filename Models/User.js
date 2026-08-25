const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  HasAdminAccess: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['superadmin', 'storekeeper', 'salesperson'],
    default: 'salesperson'
  }
  }, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

//Create model from schema
const User = mongoose.model('User', userSchema);

module.exports = User; // Export the User model to be used in other files