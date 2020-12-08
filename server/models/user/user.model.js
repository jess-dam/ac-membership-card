const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: { type: String, default: '???' },
    email: { type: String, required: true },
    password: { type: String, required: true },
    created_at: { type: TimeRanges, required: true }
});

module.exports = mongoose.model('User', UserSchema);