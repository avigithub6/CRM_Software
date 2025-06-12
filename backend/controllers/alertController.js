const Alert = require('../models/Alert');
const { sendEmail } = require('../utils/email');
const { sendSMS } = require('../utils/sms');
const User = require('../models/User');
const Client = require('../models/Client');
const Guard = require('../models/Guard');

exports.createAlert = async (req, res) => {
    try {
        const alert = new Alert(req.body);
        await alert.save();

        // Email/SMS logic
        let email = null, phone = null;
        if (alert.user) {
            const user = await User.findById(alert.user);
            if (user) email = user.email;
        }
        if (alert.client) {
            const client = await Client.findById(alert.client);
            if (client) {
                email = email || client.contactEmail;
                phone = phone || client.contactPhone;
            }
        }
        if (alert.guard) {
            const guard = await Guard.findById(alert.guard);
            if (guard) {
                email = email || guard.email;
                phone = phone || guard.phone;
            }
        }
        if (email) {
            sendEmail({
                to: email,
                subject: `Alert: ${alert.type}`,
                text: alert.message,
            }).catch(console.error);
        }
        if (phone) {
            sendSMS({
                to: phone,
                message: alert.message,
            }).catch(console.error);
        }

        res.status(201).json(alert);
    } catch (err) {
        res.status(400).json({ message: 'Error creating alert', error: err.message });
    }
};

exports.getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find().populate('user client guard');
        res.json(alerts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching alerts', error: err.message });
    }
};

exports.getAlertById = async (req, res) => {
    try {
        const alert = await Alert.findById(req.params.id).populate('user client guard');
        if (!alert) return res.status(404).json({ message: 'Alert not found' });
        res.json(alert);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching alert', error: err.message });
    }
};

exports.updateAlert = async (req, res) => {
    try {
        const alert = await Alert.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!alert) return res.status(404).json({ message: 'Alert not found' });
        res.json(alert);
    } catch (err) {
        res.status(400).json({ message: 'Error updating alert', error: err.message });
    }
};

exports.deleteAlert = async (req, res) => {
    try {
        const alert = await Alert.findByIdAndDelete(req.params.id);
        if (!alert) return res.status(404).json({ message: 'Alert not found' });
        res.json({ message: 'Alert deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting alert', error: err.message });
    }
}; 