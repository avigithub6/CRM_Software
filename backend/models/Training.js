const mongoose = require('mongoose');

const TrainingSchema = new mongoose.Schema({
    guard: { type: mongoose.Schema.Types.ObjectId, ref: 'Guard', required: true },
    certification: { type: String, required: true },
    dateCompleted: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    status: { type: String, enum: ['Valid', 'Expired'], default: 'Valid' },
    notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Training', TrainingSchema); 