const Incident = require('../models/Incident');

exports.createIncident = async (req, res) => {
    try {
        const incident = new Incident(req.body);
        await incident.save();
        res.status(201).json(incident);
    } catch (err) {
        res.status(400).json({ message: 'Error creating incident', error: err.message });
    }
};

exports.getIncidents = async (req, res) => {
    try {
        let filter = {};
        if (req.user.role === 'Guard') {
            filter.guard = req.user.id;
        }
        const incidents = await Incident.find(filter).populate('guard client');
        res.json(incidents);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching incidents', error: err.message });
    }
};

exports.getIncidentById = async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id).populate('guard client');
        if (!incident) return res.status(404).json({ message: 'Incident not found' });
        res.json(incident);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching incident', error: err.message });
    }
};

exports.updateIncident = async (req, res) => {
    try {
        const incident = await Incident.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!incident) return res.status(404).json({ message: 'Incident not found' });
        res.json(incident);
    } catch (err) {
        res.status(400).json({ message: 'Error updating incident', error: err.message });
    }
};

exports.deleteIncident = async (req, res) => {
    try {
        const incident = await Incident.findByIdAndDelete(req.params.id);
        if (!incident) return res.status(404).json({ message: 'Incident not found' });
        res.json({ message: 'Incident deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting incident', error: err.message });
    }
}; 