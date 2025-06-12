const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
    guard: { type: mongoose.Schema.Types.ObjectId, ref: 'Guard', required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    images: [{ type: String }], // URLs or file paths
    gps: {
        lat: { type: Number },
        lng: { type: Number }
    },
    status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
    escalationLevel: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Incident', IncidentSchema); 