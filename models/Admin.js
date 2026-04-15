const mongoose = require('mongoose');

const adminActionSchema = new mongoose.Schema({
  admin:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action:     { type: String },     // e.g. "banned user", "approved stay"
  targetId:   { type: String },     // ID of the affected document
  targetType: { type: String },     // e.g. "User", "Stay"
  notes:      { type: String },
}, { timestamps: true });

module.exports = mongoose.model('AdminAction', adminActionSchema);