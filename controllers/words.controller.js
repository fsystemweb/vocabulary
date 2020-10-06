const wordsService = require("../services/words.service");

const get = function (req, res) {
  res.json(wordsService.get(req.params._id));
};

const getAll = function (req, res) {
  res.json(wordsService.getAll());
};

const save = function (req, res) {
  var body = req.body;
  res.json(wordsService.save(body));
};

const deleteById = function (req, res) {
  res.json(wordsService.deleteById(req.params._id));
};

const updateById = function (req, res) {
  var body = req.body;
  res.json(wordsService.updateById(req.params._id, body));
};

module.exports = {
  get,
  getAll,
  save,
  deleteById,
  updateById,
};
