const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const guardController = require('../controllers/guardController');

router.post('/', auth, role('Admin'), guardController.createGuard);
router.get('/', auth, role(['Admin', 'Client']), guardController.getGuards);
router.get('/:id', auth, role(['Admin', 'Client']), guardController.getGuardById);
router.put('/:id', auth, role('Admin'), guardController.updateGuard);
router.delete('/:id', auth, role('Admin'), guardController.deleteGuard);
router.post('/:id/shifts', auth, role('Admin'), guardController.allocateShift);

module.exports = router; 