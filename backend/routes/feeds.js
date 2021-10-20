const crawler = require('../common/crawler');

const router = require('express').Router();

router.post('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  const feedImages = await crawler(username, password, id);
  res.status(200).send({
    images: feedImages,
  });
});

module.exports = router;
