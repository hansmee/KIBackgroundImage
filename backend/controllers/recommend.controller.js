const spawn = require('child_process').spawn;

exports.recommend = async (req, res) => {
  const { images } = req.body;
  const imgUrls = images.join(' ');

  const child = spawn('python3', ['../model/main.py', imgUrls]);
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
