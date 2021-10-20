const crawler = require('../common/crawler');

exports.crawl = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  const feedImages = await crawler(username, password, id);

  res.status(200).send({
    images: feedImages,
  });
};
