var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
  req.send({ greeting: "Hello React.js X Node.js" });
});

router.get("/api", function (req, res, next) {
  res.send({ greeting: "Hello React.js X Node.js" });
});

router.get("/test", function (req, res, next) {
  res.render("test", { title: "Test" });
});

module.exports = router;
