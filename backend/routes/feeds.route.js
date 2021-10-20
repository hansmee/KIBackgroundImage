const router = require('express').Router();
const { crawl } = require('../controllers/feeds.controller');

router.post('/:id', crawl);

module.exports = router;
