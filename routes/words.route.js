const express = require("express");
const router = express.Router({ mergeParams: true });

const wordsController = require("../controllers/words.controller");

router.route("/").get(wordsController.getAll);

router.route("/:_id").get(wordsController.get);

router.route("/").post(wordsController.save);

router.route("/:_id").delete(wordsController.deleteById);

module.exports = router;
