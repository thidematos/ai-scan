const express = require('express');
const geminiController = require('./../controller/geminiController');
const upload = require('./../util/multerUpload');

const router = express.Router();

router.post(
  '/:prompt',
  upload.single('image'),
  geminiController.getGeminiAnswer
);

router.post(
  '/export/:type',
  geminiController.sendMail,
  geminiController.createExport
);

module.exports = router;
