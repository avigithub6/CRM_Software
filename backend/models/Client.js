const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    contactPerson: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    contractStart: { type: Date, required: true },
    contractEnd: { type: Date, required: true },
    contractFile: { type: String }, // URL or file path
    status: { type: String, enum: ['Active', 'Expired'], default: 'Active' },
}, { timestamps: true });

module.exports = mongoose.model('Client', ClientSchema); 