const Guard = require('../models/Guard');

exports.createGuard = async (req, res) => {
    try {
        const guard = new Guard(req.body);
        await guard.save();
        res.status(201).json(guard);
    } catch (err) {
        res.status(400).json({ message: 'Error creating guard', error: err.message });
    }
};

exports.getGuards = async (req, res) => {
    try {
        const guards = await Guard.find().populate('assignedClient');
        res.json(guards);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching guards', error: err.message });
    }
};

exports.getGuardById = async (req, res) => {
    try {
        const guard = await Guard.findById(req.params.id).populate('assignedClient');
        if (!guard) return res.status(404).json({ message: 'Guard not found' });
        res.json(guard);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching guard', error: err.message });
    }
};

exports.updateGuard = async (req, res) => {
    try {
        const guard = await Guard.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!guard) return res.status(404).json({ message: 'Guard not found' });
        res.json(guard);
    } catch (err) {
        res.status(400).json({ message: 'Error updating guard', error: err.message });
    }
};

exports.deleteGuard = async (req, res) => {
    try {
        const guard = await Guard.findByIdAndDelete(req.params.id);
        if (!guard) return res.status(404).json({ message: 'Guard not found' });
        res.json({ message: 'Guard deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting guard', error: err.message });
    }
};

exports.allocateShift = async (req, res) => {
    try {
        const { id } = req.params;
        const shift = req.body;
        const guard = await Guard.findById(id);
        if (!guard) return res.status(404).json({ message: 'Guard not found' });
        guard.shifts.push(shift);
        await guard.save();
        res.json(guard);
    } catch (err) {
        res.status(400).json({ message: 'Error allocating shift', error: err.message });
    }
}; 