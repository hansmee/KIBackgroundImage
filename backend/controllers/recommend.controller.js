const spawn = require('child_process').spawn;

exports.recommend = async (req, res) => {
  //   const { id } = req.params;
  //   const { username, password } = req.body;
  //   const feedImages = await crawler(username, password, id);
  //   res.status(200).send({
  //     images: feedImages,
  //   });

  const child = spawn('python3', [
    '../model/main.py',
    'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/c315.0.810.810a/s150x150/244755952_606607363816936_5060313622472449639_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=104&_nc_ohc=4UwabGaVUC4AX_7ATby&edm=ABfd0MgBAAAA&ccb=7-4&oh=fa9d778d537f9a2a4538775abceefc84&oe=6176DA99&_nc_sid=7bff83 https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/c315.0.810.810a/s150x150/244755952_606607363816936_5060313622472449639_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=104&_nc_ohc=4UwabGaVUC4AX_7ATby&edm=ABfd0MgBAAAA&ccb=7-4&oh=fa9d778d537f9a2a4538775abceefc84&oe=6176DA99&_nc_sid=7bff83',
  ]);
  let result = '';

  child.stdout.on('data', (res) => {
    result = res.toString();
  });

  child.stderr.on('data', (err) => {
    console.log(err.toString());
    res.status(500).send({
      error: err.toString(),
    });
  });

  child.on('close', () => {
    res.status(200).send({
      result,
    });
  });
};
