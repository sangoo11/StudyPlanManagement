const VerificationLogsService = require('../services/verificationLogs.service');
const { CREATED, OK } = require('../core/success.response');

module.exports = {
    // Get all verification logs
    async getAll(req, res) {
        try {
            const logs = await VerificationLogsService.getAll();
            new OK({
                message: 'Get all verification logs success',
                metadata: logs
            }).send(res);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Get verification log by ID
    async getById(req, res) {
        try {
            const log = await VerificationLogsService.getById(req.params.id);
            if (!log) return res.status(404).json({ error: 'Verification log not found' });
            new OK({
                message: 'Get verification log by id success',
                metadata: log
            }).send(res);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Get all verification logs by certificate ID
    async getByCertificateId(req, res) {
        try {
            const logs = await VerificationLogsService.getByCertificateId(req.params.id);
            new OK({
                message: 'Get all verification logs by certificate id success',
                metadata: logs
            }).send(res);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Create verification log (admin/teacher only, update certificate status)
    async create(req, res) {
        try {
            new CREATED({
                message: 'Create verification log success',
                metadata: await VerificationLogsService.create(req.body)
            }).send(res);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Update verification log (PATCH)
    async update(req, res) {
        try {
            const log = await VerificationLogsService.update(req.params.id, req.body);
            if (!log) return res.status(404).json({ error: 'Verification log not found' });
            new OK({
                message: 'Update verification log success',
                metadata: log
            }).send(res);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Delete verification log
    async delete(req, res) {
        try {
            const log = await VerificationLogsService.remove(req.params.id);
            if (!log) return res.status(404).json({ error: 'Verification log not found' });
            new OK({
                message: 'Delete verification log success',
                metadata: log
            }).send(res);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
}; 