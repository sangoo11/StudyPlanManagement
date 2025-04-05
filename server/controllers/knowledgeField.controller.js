const { CREATED } = require("../core/success.response");
const KnowledgeFieldService = require("../services/knowledgeField.service");

class KnowledgeFieldController {
  getKnowledgeFields = async (req, res, next) => {
    new CREATED({
      message: "Get Knowledge Fields Success",
      metadata: await KnowledgeFieldService.getKnowledgeFields(),
      options: {
        limit: 10,
      },
    }).send(res);
  };

  getKnowledgeField = async (req, res, next) => {
    new CREATED({
      message: "Get Knowledge Field Success",
      metadata: await KnowledgeFieldService.getKnowledgeField(req.params.id),
      options: {
        limit: 10,
      },
    }).send(res);
  };

  createKnowledgeField = async (req, res, next) => {
    new CREATED({
      message: "Create Knowledge Field Success",
      metadata: await KnowledgeFieldService.createKnowledgeField(req.body),
      options: {
        limit: 10,
      },
    }).send(res);
  };

  updateKnowledgeField = async (req, res, next) => {
    new CREATED({
      message: "Update Knowledge Field Success",
      metadata: await KnowledgeFieldService.updateKnowledgeField(
        req.params.id,
        req.body
      ),
      options: {
        limit: 10,
      },
    }).send(res);
  };

  deleteKnowledgeField = async (req, res, next) => {
    new CREATED({
      message: "Delete Knowledge Field Success",
      metadata: await KnowledgeFieldService.deleteKnowledgeField(req.params.id),
      options: {
        limit: 10,
      },
    }).send(res);
  };

  getKnowledgeFieldStudentLearn = async (req, res, next) => {
    new CREATED({
      message: "Get Knowledge Field Student Learn Success",
      metadata: await KnowledgeFieldService.getKnowledgeFieldStudentLearn(req.params.studentID, req.query),
      options: {
        limit: 10,
      },
    }).send(res);
  };
}

module.exports = new KnowledgeFieldController();
