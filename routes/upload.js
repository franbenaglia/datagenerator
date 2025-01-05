const express = require('express');
const uploadController = require('../controllers/upload.js');
const router = express.Router();

router.get("/initData/:repeat", uploadController.loadFileFromLocal);

router.get("/initData", uploadController.loadFileFromLocal);

router.get("/initCustomData", uploadController.loadFileFromCustom);

module.exports = router;