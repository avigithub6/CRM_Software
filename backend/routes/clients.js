const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const clientController = require('../controllers/clientController');

router.post('/', auth, role('Admin'), clientController.createClient);
router.get('/', auth, role(['Admin', 'Client']), clientController.getClients);
router.get('/:id', auth, role(['Admin', 'Client']), clientController.getClientById);
router.put('/:id', auth, role('Admin'), clientController.updateClient);
router.delete('/:id', auth, role('Admin'), clientController.deleteClient);

module.exports = router; 