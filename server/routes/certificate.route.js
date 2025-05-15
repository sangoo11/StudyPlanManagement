const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificate.controller');

router.get('/', certificateController.getAll);
router.get('/:id', certificateController.getById);
router.post('/', certificateController.create);
router.patch('/:id', certificateController.update);
router.delete('/:id', certificateController.delete);

module.exports = router; 