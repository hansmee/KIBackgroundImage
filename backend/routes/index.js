const router = require('express').Router();

const feeds = require('./feeds.route');

router.use('/feeds', feeds);

module.exports = router;
