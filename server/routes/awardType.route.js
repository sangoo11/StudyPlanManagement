const express = require('express');
const router = express.Router();
const awardTypeController = require('../controllers/awardType.controller');

// Create a new award type
router.post('/', awardTypeController.createAwardType);

// Get all award types
router.get('/', awardTypeController.getAllAwardTypes);

// Get award type by ID
router.get('/:id', awardTypeController.getAwardTypeById);

// Update award type
router.patch('/:id', awardTypeController.updateAwardType);

// Delete award type
router.delete('/:id', awardTypeController.deleteAwardType);

module.exports = router; 