const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificate.controller');

const multer = require("multer");

const storageConfig = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "public/images/certificate");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storageConfig });

router.get('/', certificateController.getAll);
router.get('/:id', certificateController.getById);
router.post('/', upload.single("image"), certificateController.create);
router.patch('/:id', certificateController.update);
router.delete('/:id', certificateController.delete);

module.exports = router; 