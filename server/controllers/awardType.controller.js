const { CREATED, OK } = require("../core/success.response");
const awardTypeService = require("../services/awardType.service");

class AwardTypeController {
    // Create a new award type
    createAwardType = async (req, res, next) => {
        try {
            new CREATED({
                message: "Create Award Type Success",
                metadata: await awardTypeService.createAwardType(req.body),
                options: {
                    limit: 10,
                },
            }).send(res);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };

    // Get all award types
    getAllAwardTypes = async (req, res, next) => {
        try {
            new OK({
                message: "Get All Award Types Success",
                metadata: await awardTypeService.getAllAwardTypes(),
                options: {
                    limit: 10,
                },
            }).send(res);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    // Get award type by ID
    getAwardTypeById = async (req, res, next) => {
        try {
            const awardType = await awardTypeService.getAwardTypeById(req.params.id);
            if (!awardType) return res.status(404).json({ error: 'Award type not found' });

            new OK({
                message: "Get Award Type By ID Success",
                metadata: awardType,
                options: {
                    limit: 10,
                },
            }).send(res);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    // Update award type
    updateAwardType = async (req, res, next) => {
        try {
            const awardType = await awardTypeService.updateAwardType(req.params.id, req.body);
            if (!awardType) return res.status(404).json({ error: 'Award type not found' });

            new OK({
                message: "Update Award Type Success",
                metadata: awardType,
                options: {
                    limit: 10,
                },
            }).send(res);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };

    // Delete award type
    deleteAwardType = async (req, res, next) => {
        try {
            const result = await awardTypeService.deleteAwardType(req.params.id);
            if (!result) return res.status(404).json({ error: 'Award type not found' });

            new OK({
                message: "Delete Award Type Success",
                metadata: result,
                options: {
                    limit: 10,
                },
            }).send(res);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
}

module.exports = new AwardTypeController(); 