const spawn = require('child_process').spawn;

exports.recommend = async (req, res) => {
  //   const { id } = req.params;
  //   const { username, password } = req.body;
  //   const feedImages = await crawler(username, password, id);
  //   res.status(200).send({
  //     images: feedImages,
  //   });

  const child = spawn('python3', ['../model/main.py']);
  let result = '';

  child.stdout.on('data', (res) => {
    result += res.toString();
  });

  child.stderr.on('data', (err) => {
    console.log(err.toString());
  });

  child.on('close', () => {
    res.status(200).send({
      result,
    });
  });
};
