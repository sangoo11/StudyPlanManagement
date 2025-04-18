const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const SubjectController = require("../controllers/subject.controller");

const multer = require("multer");

const storageConfig = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/images/subject");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storageConfig });

// Get All Subjects
router.get("/get-all-subject", asyncHandler(SubjectController.getAllSubject));
router.get(
  "/get-all-subject-code",
  asyncHandler(SubjectController.getAllSubjectCode)
);
router.get(
  "/get-subject/:subjectId",
  asyncHandler(SubjectController.getSubjectById)
);

// Create a new subject
router.post(
  "/create-new-subject",
  upload.single("image"),
  asyncHandler(SubjectController.createSubject)
);

// Edit a subject
router.put(
  "/edit-subject/:subjectID",
  asyncHandler(SubjectController.editSubject)
);

// Delete a subject
router.put(
  "/delete-subject/:subjectID",
  asyncHandler(SubjectController.deleteSubject)
);

router.get(
  "/get-all-subject-factor",
  asyncHandler(SubjectController.getAllSubjectFactor)
);

router.get(
  "/get-subject-by-LO/:studentID",
  asyncHandler(SubjectController.getSubjectInLOByStudentID)
);
router.get("/get-LO-score/:LOID", asyncHandler(SubjectController.getLOScore));

module.exports = router;
