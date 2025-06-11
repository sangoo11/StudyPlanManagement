const AwardService = require('../services/award.service');
const { CREATED, OK } = require('../core/success.response');

module.exports = {
    // Get all awards
    async getAll(req, res) {
        try {
            const awards = await AwardService.getAll(req.query);
            new OK({
                message: 'Get all awards success',
                metadata: awards
            }).send(res);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Get award by ID
    async getById(req, res) {
        try {
            const award = await AwardService.getById(req.params.id);
            if (!award) return res.status(404).json({ error: 'Award not found' });
            new OK({
                message: 'Get award by id success',
                metadata: award
            }).send(res);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Create award
    async create(req, res) {
        try {
            new CREATED({
                message: 'Create award success',
                metadata: await AwardService.create(req.body, req.file)
            }).send(res);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Update award (PATCH)
    async update(req, res) {
        try {
            const award = await AwardService.update(req.params.id, req.body);
            if (!award) return res.status(404).json({ error: 'Award not found' });
            new OK({
                message: 'Update award success',
                metadata: award
            }).send(res);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Delete award
    async delete(req, res) {
        try {
            const award = await AwardService.remove(req.params.id);
            if (!award) return res.status(404).json({ error: 'Award not found' });
            new OK({
                message: 'Delete award success',
                metadata: award
            }).send(res);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};