const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    points: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Card', CardSchema);