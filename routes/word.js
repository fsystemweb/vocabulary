var express = require("express");
var router = express.Router();
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var Word = require("../models/Word.js");

server.listen(4000);

// socket io
io.on("connection", function (socket) {
  socket.on("newdata", function (data) {
    io.emit("new-data", { data: data });
  });
  socket.on("updatedata", function (data) {
    io.emit("update-data", { data: data });
  });
});

// list data
router.get("/", function (req, res) {
  Word.find(function (err, word) {
    if (err) return next(err);
    res.json(word);
  });
});

// get data by id
router.get("/:id", function (req, res, next) {
  Word.findById(req.params.id, function (err, word) {
    if (err) return next(err);
    res.json(word);
  });
});

// get data by id
router.get("/:id", function (req, res, next) {
  Word.findById(req.params.id, function (err, word) {
    if (err) return next(err);
    res.json(word);
  });
});

// post data
router.post("/", function (req, res, next) {
  Word.create(req.body, function (err, word) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(word);
  });
});

// put data
router.put("/:id", function (req, res, next) {
  Word.findByIdAndUpdate(req.params.id, req.body, function (err, word) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(word);
  });
});

// delete data by id
router.delete("/:id", function (req, res, next) {
  Word.findByIdAndRemove(req.params.id, req.body, function (err, word) {
    if (err) return next(err);
    res.json(word);
  });
});
