var express = require("express");
const words = require("./words.route");

var router = express.Router();

router.use("/words", words);

router.get("/", (req, res) => res.send("Vocabulary API"));

module.exports = router;
