const router = require('express').Router();
const { recommend } = require('../controllers/recommend.controller');

router.post('/', recommend);

module.exports = router;
