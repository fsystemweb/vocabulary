("use strict");

const fs = require("fs");

const getStorage = function () {
  let rawdata = fs.readFileSync("data.json");
  return JSON.parse(rawdata);
};

const getNewId = function () {
  const storage = this.getStorage();
  if (storage.length == 0) return 1;
  const lastIndex = storage.length - 1;
  const lastWord = storage[lastIndex];
  return lastWord.id + 1;
};

const writeStorage = function (storage) {
  const data = JSON.stringify(storage);
  fs.writeFile("data.json", data, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });
};

module.exports = {
  getStorage,
  getNewId,
  writeStorage,
};
