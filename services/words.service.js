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
  word.updated = getCurrentDate();
  word.created = getCurrentDate();
  storage.push(word);

  storageService.writeStorage(storage);
  return word;
};

const updateById = function (id, word) {
  deleteById(id);
  const storage = storageService.getStorage();
  word.updated = getCurrentDate();
  storage.push(word);
  storageService.writeStorage(storage);
  return word;
};

const deleteById = function (id) {
  let storage = storageService.getStorage();
  const index = storage.findIndex((element) => element.id == id);
  storage.splice(index, 1);
  storageService.writeStorage(storage);

  const message = {
    alert: "Word with id:" + id + " was successfully removed",
  };

  return message;
};

const getCurrentDate = function () {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  return today;
};

module.exports = {
  get,
  getAll,
  save,
  deleteById,
  updateById,
};
