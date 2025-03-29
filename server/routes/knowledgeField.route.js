const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
// knowledge field controller
const KnowledgeFieldController = require("../controllers/knowledgeField.controller");

router.get("/", asyncHandler(KnowledgeFieldController.getKnowledgeFields));
router.get("/:id", asyncHandler(KnowledgeFieldController.getKnowledgeField));
router.post("/", asyncHandler(KnowledgeFieldController.createKnowledgeField));
router.put("/:id", asyncHandler(KnowledgeFieldController.updateKnowledgeField));
router.delete(
  "/:id",
  asyncHandler(KnowledgeFieldController.deleteKnowledgeField)
);

router.get("/student/:studentID", asyncHandler(KnowledgeFieldController.getKnowledgeFieldStudentLearn));

module.exports = router;
