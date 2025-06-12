const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const trainingController = require('../controllers/trainingController');

router.post('/', auth, role('Admin'), trainingController.createTraining);
router.get('/', auth, role(['Admin', 'Guard']), trainingController.getTrainings);
router.get('/:id', auth, role(['Admin', 'Guard']), trainingController.getTrainingById);
router.put('/:id', auth, role('Admin'), trainingController.updateTraining);
router.delete('/:id', auth, role('Admin'), trainingController.deleteTraining);

module.exports = router; 