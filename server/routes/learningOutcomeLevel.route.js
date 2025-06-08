const express = require("express");
const asyncHandler = require("../helpers/asyncHandler");
const LearningOutcomeLevelController = require("../controllers/learningOutcomeLevel.controller");
const router = express.Router();

// Get all learning outcome levels
router.get('/', asyncHandler(LearningOutcomeLevelController.getAllLevels));

// Get learning outcome level by ID
router.get('/:id', asyncHandler(LearningOutcomeLevelController.getLevelById));

// Create new learning outcome level
router.post('/', asyncHandler(LearningOutcomeLevelController.createLevel));

// Update learning outcome level
router.put('/:id', asyncHandler(LearningOutcomeLevelController.updateLevel));

// Delete learning outcome level
router.delete('/:id', asyncHandler(LearningOutcomeLevelController.deleteLevel));

module.exports = router; 