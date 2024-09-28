const express = require('express');
const router = express.Router();
const user = require('./user.routes')
const product = require('./product.routes');
const recipe = require('./recipe.routes');

router.use('/api', user)
router.use('/api', product)
router.use('/api', recipe)

module.exports = router