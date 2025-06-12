const Training = require('../models/Training');

exports.createTraining = async (req, res) => {
    try {
        const training = new Training(req.body);
        await training.save();
        res.status(201).json(training);
    } catch (err) {
        res.status(400).json({ message: 'Error creating training record', error: err.message });
    }
};

exports.getTrainings = async (req, res) => {
    try {
        let filter = {};
        if (req.user.role === 'Guard') {
            filter.guard = req.user.id;
        }
        const trainings = await Training.find(filter).populate('guard');
        res.json(trainings);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching trainings', error: err.message });
    }
};

exports.getTrainingById = async (req, res) => {
    try {
        const training = await Training.findById(req.params.id).populate('guard');
        if (!training) return res.status(404).json({ message: 'Training record not found' });
        res.json(training);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching training', error: err.message });
    }
};

exports.updateTraining = async (req, res) => {
    try {
        const training = await Training.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!training) return res.status(404).json({ message: 'Training record not found' });
        res.json(training);
    } catch (err) {
        res.status(400).json({ message: 'Error updating training', error: err.message });
    }
};

exports.deleteTraining = async (req, res) => {
    try {
        const training = await Training.findByIdAndDelete(req.params.id);
        if (!training) return res.status(404).json({ message: 'Training record not found' });
        res.json({ message: 'Training record deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting training', error: err.message });
    }
}; 