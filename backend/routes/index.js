const router = require('express').Router();

const feeds = require('./feeds.route');
const recommend = require('./recommend.route');

router.use('/feeds', feeds);
router.use('/recommend', recommend);

module.exports = router;
