const express = require('express')
var product = require('../controller/product.controller');
var router = express.Router();
const multer = require('multer')
const upload = multer()

router.get('/', product.findAll );
router.get('/:id', product.findOne );
router.post('/', product.create );
router.put('/:id', product.update );
router.delete('/:id', product.delete );
router.post('/:id/import', upload.single('file'), product.import );
module.exports = router;