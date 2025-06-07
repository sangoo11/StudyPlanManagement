const {CREATED} = require("../core/success.response");
const KnowledgeDomainService = require("../services/knowledgeDomain.service");

class KnowledgeDomainController {
    getKnowledgeDomains = async (req, res, next) => {
        new CREATED({
            message: "Get Knowledge Domains Success",
            metadata: await KnowledgeDomainService.getKnowledgeDomains(req.query),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    getKnowledgeDomain = async (req, res, next) => {
        new CREATED({
            message: "Get Knowledge Domain Success",
            metadata: await KnowledgeDomainService.getKnowledgeDomain(req.params.id),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    createKnowledgeDomain = async (req, res, next) => {
        new CREATED({
            message: "Create Knowledge Domain Success",
            metadata: await KnowledgeDomainService.createKnowledgeDomain(req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    updateKnowledgeDomain = async (req, res, next) => {
        new CREATED({
            message: "Update Knowledge Domain Success",
            metadata: await KnowledgeDomainService.updateKnowledgeDomain(
                req.params.id,
                req.body
            ),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    deleteKnowledgeDomain = async (req, res, next) => {
        new CREATED({
            message: "Delete Knowledge Domain Success",
            metadata: await KnowledgeDomainService.deleteKnowledgeDomain(
                req.params.id
            ),
            options: {
                limit: 10,
            },
        }).send(res);
    };
}

module.exports = new KnowledgeDomainController();
