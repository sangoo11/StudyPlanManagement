const CertificateService = require('../services/certificate.service');
const { CREATED, OK } = require('../core/success.response');

module.exports = {
    // Get all certificates
    async getAll(req, res) {
        try {
            const certificates = await CertificateService.getAll();
            new OK({
                message: 'Get all certificates success',
                metadata: certificates
            }).send(res);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Get certificate by ID
    async getById(req, res) {
        try {
            const certificate = await CertificateService.getById(req.params.id);
            if (!certificate) return res.status(404).json({ error: 'Certificate not found' });
            new OK({
                message: 'Get certificate by id success',
                metadata: certificate
            }).send(res);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Create certificate
    async create(req, res) {
        try {
            new CREATED({
                message: 'Create certificate success',
                metadata: await CertificateService.create(req.body)
            }).send(res);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Update certificate (PATCH)
    async update(req, res) {
        try {
            const certificate = await CertificateService.update(req.params.id, req.body);
            if (!certificate) return res.status(404).json({ error: 'Certificate not found' });
            new OK({
                message: 'Update certificate success',
                metadata: certificate
            }).send(res);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Delete certificate
    async delete(req, res) {
        try {
            const certificate = await CertificateService.remove(req.params.id);
            if (!certificate) return res.status(404).json({ error: 'Certificate not found' });
            new OK({
                message: 'Delete certificate success',
                metadata: certificate
            }).send(res);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
}; 