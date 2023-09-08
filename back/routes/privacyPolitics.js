const express = require('express');
const router = express.Router();
const privacyPoliticsController = require('../controllers/privacyPoliticsController');

router.get('/privacyPolitics', privacyPoliticsController.index)

module.exports=router;