const express = require('express');
const router = express.Router();
const verificationLogsController = require('../controllers/verificationLogs.controller');

router.get('/', verificationLogsController.getAll);
router.get('/:id', verificationLogsController.getById);
router.get('/certificate/:id', verificationLogsController.getByCertificateId);
router.post('/', verificationLogsController.create);
module.exports = router; 