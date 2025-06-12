const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const alertController = require('../controllers/alertController');

router.post('/', auth, role('Admin'), alertController.createAlert);
router.get('/', auth, role(['Admin', 'Client', 'Guard']), alertController.getAlerts);
router.get('/:id', auth, role(['Admin', 'Client', 'Guard']), alertController.getAlertById);
router.put('/:id', auth, role('Admin'), alertController.updateAlert);
router.delete('/:id', auth, role('Admin'), alertController.deleteAlert);

module.exports = router; 