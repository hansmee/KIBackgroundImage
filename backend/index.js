const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("KIBackgroundImage Server");
});

// accept POST request on the homepage
app.post("/", function (req, res) {
  res.send("POST 요청");
});

// accept PUT request at /user
app.put("/user", function (req, res) {
  res.send("PUT 요청");
});

// accept DELETE request at /user
app.delete("/user", function (req, res) {
  res.send("DELETE 요청");
});
