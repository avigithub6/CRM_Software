const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const auditController = require('../controllers/auditController');

router.post('/', auth, role('Admin'), auditController.createAudit);
router.get('/', auth, role(['Admin', 'Client']), auditController.getAudits);
router.get('/:id', auth, role(['Admin', 'Client']), auditController.getAuditById);
router.put('/:id', auth, role('Admin'), auditController.updateAudit);
router.delete('/:id', auth, role('Admin'), auditController.deleteAudit);

module.exports = router; 