const router = require('express').Router();

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  res.send(`your id is ${id}`);
});

module.exports = router;
