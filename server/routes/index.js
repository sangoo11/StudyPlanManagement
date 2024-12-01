"use strict";

const express = require("express");
const cors = require("cors");
const router = express.Router();

router.use(cors());

router.use("/v1/api/access", require("./access"));
router.use("/v1/api/student", require("./student"));
router.use("/v1/api/learningOutcome", require("./learningOutcome"));

module.exports = router;
