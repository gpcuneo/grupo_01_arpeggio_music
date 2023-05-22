const express = require('express');
const router = express.Router();
const category = require('../controllers/categoryController')

router.use('/create', category.create);
router.use('/:id?', category.showbyid)
router.use('/id/update', category.update);
router.use('/id/delete', category.delete)
router.use('/', category.show);

module.exports = router