const express = require('express')
var count = require('../controller/count-product.controller');
var router = express.Router();

router.get('/', count.findAll );
router.get('/:id', count.findOne );
router.post('/', count.create );
router.put('/:id', count.update );
router.delete('/:id', count.delete );

module.exports = router;