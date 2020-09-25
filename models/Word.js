var mongoose = require("mongoose");

var WordSchema = new mongoose.Schema({
  name: String,
  pronunciation: String,
  meaning: String,
  updated: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Word", WordSchema);
