const express = require('express');
const app = express();
const port = 3002;

app.get('/', (req, res) => {
  res.status(200).send('hello');
});

app.use('/api', require('./routes'));

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port} ...`);
  console.log('Server Start');
});
