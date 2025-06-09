const express = require('express');
const router = express.Router();
const awardController = require('../controllers/award.controller');

const multer = require("multer");

const storageConfig = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "public/images/award");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storageConfig });

router.get('/', awardController.getAll);
router.get('/:id', awardController.getById);
router.post('/', upload.single("image"), awardController.create);
router.patch('/:id', awardController.update);
router.delete('/:id', awardController.delete);

module.exports = router; 