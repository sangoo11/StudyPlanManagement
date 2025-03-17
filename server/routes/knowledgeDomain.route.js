const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const KnowledgeDomainController = require("../controllers/knowledgeDomain.controller");

router.get("/", asyncHandler(KnowledgeDomainController.getKnowledgeDomains));
router.get("/:id", asyncHandler(KnowledgeDomainController.getKnowledgeDomain));
router.post("", asyncHandler(KnowledgeDomainController.createKnowledgeDomain));
router.put(
  "/:id",
  asyncHandler(KnowledgeDomainController.updateKnowledgeDomain)
);
router.delete(
  "/:id",
  asyncHandler(KnowledgeDomainController.deleteKnowledgeDomain)
);

module.exports = router;
