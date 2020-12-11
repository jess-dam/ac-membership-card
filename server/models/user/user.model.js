const mongoose = require('mongoose');
const userAccessTypes = require('./userAccessTypes');

const UserSchema = mongoose.Schema({
    name: { type: String, default: '???' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cardId: { type: mongoose.Schema.Types.ObjectId },
    access: { type : String, enum: userAccessTypes, default: 'DEFAULT'}
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);