const router = require('express').Router();

const feeds = require('./feeds');

router.use('/feeds', feeds);

module.exports = router;
