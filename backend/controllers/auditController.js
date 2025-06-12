const Audit = require('../models/Audit');

exports.createAudit = async (req, res) => {
    try {
        const audit = new Audit(req.body);
        await audit.save();
        res.status(201).json(audit);
    } catch (err) {
        res.status(400).json({ message: 'Error creating audit', error: err.message });
    }
};

exports.getAudits = async (req, res) => {
    try {
        const audits = await Audit.find().populate('supervisor client');
        res.json(audits);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching audits', error: err.message });
    }
};

exports.getAuditById = async (req, res) => {
    try {
        const audit = await Audit.findById(req.params.id).populate('supervisor client');
        if (!audit) return res.status(404).json({ message: 'Audit not found' });
        res.json(audit);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching audit', error: err.message });
    }
};

exports.updateAudit = async (req, res) => {
    try {
        const audit = await Audit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!audit) return res.status(404).json({ message: 'Audit not found' });
        res.json(audit);
    } catch (err) {
        res.status(400).json({ message: 'Error updating audit', error: err.message });
    }
};

exports.deleteAudit = async (req, res) => {
    try {
        const audit = await Audit.findByIdAndDelete(req.params.id);
        if (!audit) return res.status(404).json({ message: 'Audit not found' });
        res.json({ message: 'Audit deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting audit', error: err.message });
    }
}; 
 