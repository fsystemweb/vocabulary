("use strict");

const storageService = require("./storage.service");

const get = function (_id) {
  return storageService.getStorage().find((word) => word.id == _id);
};

const getAll = function () {
  return storageService.getStorage();
};

const save = function (word) {
  const storage = storageService.getStorage();
  word.id = storageService.getNewId();
  storage.push(word);

  storageService.writeStorage(storage);
  return word;
};

const deleteById = function (id) {
  const storage = storageService.getStorage();
  const index = storage.findIndex((element) => element.id === id);
  storage.slice(index, 1);
  storageService.writeStorage(storage);

  const message = {
    alert: "Word with id:" + id + " was successfully removed",
  };

  return message;
};

module.exports = {
  get,
  getAll,
  save,
  deleteById,
};
