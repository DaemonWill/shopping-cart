const chai = require("chai");
const chaiHttp = require("chai-http");
const apiServer = require("../index");
const should = chai.should();

chai.use(chaiHttp);

/*
* Simple testing for all api router endpoints and logic
*/
describe("Shopping-Cart API", () => {
  //Test Get request to items endpoint
  it("should return a 200 response after a GET call to the items endpoint", (done) => {
    chai.request(apiServer)
      .get("/api/items")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  //Test Get request to shopping-carts endpoint
  it("should return a 200 response after a GET call to the shopping-carts endpoint", (done) => {
    chai.request(apiServer)
      .get("/api/shopping-carts")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
