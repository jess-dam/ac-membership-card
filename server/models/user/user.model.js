const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: { type: String, default: '???' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cardId: { type: mongoose.Schema.Types.ObjectId }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);