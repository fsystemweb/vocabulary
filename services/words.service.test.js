const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");

var storageService = require("./storage.service");
var wordsService = require("./words.service");

const testData = [
  {
    id: 1,
    name: "test1",
    pronunciation: "test1",
    meaning: "test1test1",
    updated: faker.date.past(),
    created: faker.date.past(),
  },
  {
    id: 2,
    name: faker.lorem.word(),
    pronunciation: faker.lorem.word(),
    meaning: faker.lorem.sentence(),
    updated: null,
    created: faker.date.past(),
  },
];

describe("Unit testing words service: ", function () {
  it("test get", function () {
    const stub = sinon.stub(storageService, "getStorage").returns(testData);

    result = wordsService.get(1);

    expect(stub.calledOnce).to.be.true;
    expect(result).to.equal(testData[0]);
    stub.restore();
  });

  it("test getAll", function () {
    const stub = sinon.stub(storageService, "getStorage").returns(testData);

    result = wordsService.getAll();

    expect(stub.calledOnce).to.be.true;
    expect(result).to.equal(testData);
    stub.restore();
  });

  it("test save", function () {
    const stub = sinon.stub(storageService, "getStorage").returns(testData);
    const stubWrite = sinon.stub(storageService, "writeStorage").returns();

    const expected = {
      id: 3,
      name: "test4",
      pronunciation: "test5",
      meaning: "test6",
      updated: getCurrentDate(),
      created: getCurrentDate(),
    };

    const newWord = {
      name: "test4",
      pronunciation: "test5",
      meaning: "test6",
      updated: null,
      created: null,
    };

    result = wordsService.save(newWord);

    expect(stub.calledTwice).to.be.true;
    expect(result.id).to.equal(expected.id);
    expect(result.name).to.equal(expected.name);
    expect(result.meaning).to.equal(expected.meaning);
    expect(result.pronunciation).to.equal(expected.pronunciation);
    expect(result.updated).to.equal(expected.updated);
    expect(result.created).to.equal(expected.created);
    stub.restore();
    stubWrite.restore();
  });

  it("test deleteById", function () {
    const stub = sinon.stub(storageService, "getStorage").returns(testData);
    const stubWrite = sinon.stub(storageService, "writeStorage").returns();

    const id = 1;

    const expected = {
      alert: "Word with id:" + id + " was successfully removed",
    };

    result = wordsService.deleteById(id);

    expect(expected.alert).to.equal(result.alert);
    stub.restore();
    stubWrite.restore();
  });

  it("test update", function () {
    const stub = sinon.stub(storageService, "getStorage").returns(testData);
    const stubWrite = sinon.stub(storageService, "writeStorage").returns();

    const expected = {
      id: 2,
      name: "test4",
      pronunciation: "test5",
      meaning: "test6",
      updated: getCurrentDate(),
      created: null,
    };

    const updateWord = {
      id: 2,
      name: "test4",
      pronunciation: "test5",
      meaning: "test6",
      updated: null,
      created: null,
    };

    result = wordsService.updateById(2, updateWord);

    expect(stub.calledTwice).to.be.true;
    expect(result.id).to.equal(expected.id);
    expect(result.name).to.equal(expected.name);
    expect(result.meaning).to.equal(expected.meaning);
    expect(result.pronunciation).to.equal(expected.pronunciation);
    expect(result.updated).to.equal(expected.updated);
    expect(result.created).to.equal(null);
    stub.restore();
    stubWrite.restore();
  });

  const getCurrentDate = function () {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;

    return today;
  };
});
