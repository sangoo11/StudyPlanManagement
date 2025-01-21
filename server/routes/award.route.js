const express = require('express');
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const AwardController = require('../controllers/award.controller');

router.get('/get-all-award', asyncHandler(AwardController.getAllAward));
router.get('/get-award/:awardID', asyncHandler(AwardController.getAwardById));
router.get('/get-student/:awardID', asyncHandler(AwardController.getStudentByAwardId));
router.get('/get-number-award/:accountID', asyncHandler(AwardController.getNumberAward));

router.post('/create-award', asyncHandler(AwardController.createAward));
router.put('/update-award/:awardID', asyncHandler(AwardController.updateAward));
router.put('/delete-award/:awardID', asyncHandler(AwardController.deleteAward));

router.get('/get-award-by-student/:studentID', asyncHandler(AwardController.getAllAwardByStudent));

router.post('/add-award-for-student/:awardID', asyncHandler(AwardController.addAwardForStudent));
router.delete('/delete-award-for-student/:awardID', asyncHandler(AwardController.deleteAwardForStudent));


module.exports = router;