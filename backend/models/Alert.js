const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g., 'Contract Expiry', 'License Renewal', etc.
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    guard: { type: mongoose.Schema.Types.ObjectId, ref: 'Guard' },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
    relatedEntity: { type: String }, // e.g., contractId, trainingId, etc.
}, { timestamps: true });

module.exports = mongoose.model('Alert', AlertSchema); 