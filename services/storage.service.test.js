const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");

var storageService = require("./storage.service");

const testData = [
  {
    id: 1,
    name: faker.lorem.word(),
    pronunciation: faker.lorem.word(),
    meaning: faker.lorem.sentence(),
    updated: faker.date.past(),
    created: faker.date.past(),
  },
  {
    id: 2,
    name: faker.lorem.word(),
    pronunciation: faker.lorem.word(),
    meaning: faker.lorem.sentence(),
    updated: faker.date.past(),
    created: faker.date.past(),
  },
];

describe("Unit testing storage service: ", function () {
  it("unit test getStorage ", function () {
    const stub = sinon.stub(storageService, "getStorage").returns(testData);

    result = storageService.getStorage();

    expect(stub.calledOnce).to.be.true;
    expect(result.length).to.equal(2);
    stub.restore();
  });

  it("unit test when getNewId has data ", function () {
    const stub = sinon.stub(storageService, "getStorage").returns(testData);

    result = storageService.getNewId();

    expect(result).to.equal(3);
    stub.restore();
  });

  it("unit test when getNewId hasn't data ", function () {
    const stub = sinon
      .stub(storageService, "getStorage")
      .returns(JSON.parse("[]"));

    result = storageService.getNewId();

    expect(result).to.equal(1);
    stub.restore();
  });
});
