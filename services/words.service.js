("use strict");

const fs = require("fs");

const getStorage = function () {
  let rawdata = fs.readFileSync("data.json");
  return JSON.parse(rawdata);
};

const getNewId = function () {
  const storage = getStorage();
  if (storage.length == null) return 1;
  const lastIndex = storage.length + 1;
  const lastWord = storage[lastIndex];
  return lastWord.id + 1;
};

const get = function (_id) {
  return getStorage().find((word) => word.id == _id);
};

const getAll = function () {
  return getStorage();
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

const save = function (word) {
  const storage = getStorage();
  word.id = getNewId();
  storage.push(word);

  writeStorage(storage);
  return word;
};

const deleteById = function (id) {
  const storage = getStorage();
  const index = storage.findIndex((element) => element.id === id);
  storage.slice(index, 1);
  writeStorage(storage);

  const message = {
    alert: "Word with id:"+id" was successfully removed";
  };

  return message;
};

module.exports = {
  get,
  getAll,
  save,
  deleteById,
};
