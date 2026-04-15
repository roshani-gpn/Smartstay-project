const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone:    { type: String },
  role:     { type: String, enum: ['user', 'provider', 'admin'], default: 'user' },
  avatar:   { type: String, default: '' },
}, { timestamps: true }); // adds createdAt, updatedAt automatically

// Hash password BEFORE saving to DB
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // skip if password unchanged
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check password on login
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);