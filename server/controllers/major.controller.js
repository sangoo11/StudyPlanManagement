const { CREATED } = require("../core/success.response");
const MajorService = require('../services/major.service');

class MajorController {
    getAllMajor = async (req, res, next) => {
        new CREATED({
            message: "Get All Major Success",
            metadata: await MajorService.getAllMajor(),
            options: {
                limit: 10,
            },
        }).send(res);
    }

    getMajorByID = async (req, res, next) => {
        new CREATED({
            message: "Get Major By ID Success",
            metadata: await MajorService.getMajorByID(req.params.majorID),
            options: {
                limit: 10,
            },
        }).send(res);
    }
}

module.exports = new MajorController();