const router = require('express').Router();
const { recommend } = require('../controllers/recommend.controller');

router.get('/', recommend);

module.exports = router;
