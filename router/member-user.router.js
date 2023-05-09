const express = require('express')
var user = require('../controller/member-user.controller');
var router = express.Router();

router.get('/', user.findAll );
router.get('/:id', user.findOne );
router.post('/', user.create );
router.put('/:id', user.update );
router.delete('/:id', user.delete );

module.exports = router;