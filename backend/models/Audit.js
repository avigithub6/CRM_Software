const mongoose = require('mongoose');

const AuditSchema = new mongoose.Schema({
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    date: { type: Date, default: Date.now },
    feedback: { type: String },
    score: { type: Number },
    findings: { type: String },
    actions: { type: String },
    attachments: [{ type: String }], // URLs or file paths
}, { timestamps: true });

module.exports = mongoose.model('Audit', AuditSchema); 