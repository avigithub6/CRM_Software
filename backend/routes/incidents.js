const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const incidentController = require('../controllers/incidentController');

router.post('/', auth, role('Guard'), incidentController.createIncident);
router.get('/', auth, role(['Admin', 'Client', 'Guard']), incidentController.getIncidents);
router.get('/:id', auth, role(['Admin', 'Client', 'Guard']), incidentController.getIncidentById);
router.put('/:id', auth, role('Admin'), incidentController.updateIncident);
router.delete('/:id', auth, role('Admin'), incidentController.deleteIncident);

module.exports = router; 