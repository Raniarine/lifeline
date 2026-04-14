const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');

router.get('/:id', emergencyController.getEmergencyInfo);
router.post('/:id/log', emergencyController.logEmergencyAccess);

module.exports = router;
