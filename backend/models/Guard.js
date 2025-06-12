const mongoose = require('mongoose');

const ShiftSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String },
    checkedIn: { type: Boolean, default: false },
    checkedOut: { type: Boolean, default: false },
    gps: {
        lat: { type: Number },
        lng: { type: Number }
    }
});

const GuardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String },
    photo: { type: String }, // URL or file path
    assignedClient: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    shifts: [ShiftSchema],
    certifications: [{ type: String }],
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });

module.exports = mongoose.model('Guard', GuardSchema); 