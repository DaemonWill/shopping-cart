const chai = require("chai");
const chaiHttp = require("chai-http");
const apiServer = require("../index");
const should = chai.should();

chai.use(chaiHttp);

/*
* Simple testing for api validity
*/
describe("Shopping-Cart API", () => {
  //Test Get request to initial api endpoint
  it("should return a 200 response after a GET call to the items endpoint", (done) => {
    chai.request(apiServer)
      .get("/api/items")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
