const express = require('express');
const router = express.Router();
const privacyPoliticsController = require('../controllers/privacyPoliticsController');

router.use('/privacyPolitics', privacyPoliticsController.index)

module.exports=router;