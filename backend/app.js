const express = require("express");
const app = express();
const port = process.env.PORT || 3002;

app.get("/", (req, res) => {
  res.status(200).send("hello");
});

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port} ...`);
  console.log("Server Start");
});
