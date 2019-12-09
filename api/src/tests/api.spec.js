const chai = require("chai");
const chaiHttp = require("chai-http");
const apiServer = require("../index");
const should = chai.should();

chai.use(chaiHttp);

/*
* Simple testing for all api router endpoints and logic
* TODO if/after setting up a test port, add an afterEach() to delete newly created resources
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

  //Default Posting to shopping-carts will add a new shopping-cart
  it("should create a new shopping cart obj after a POST to the shopping-carts endpoint", (done) => {
    chai.request(apiServer)
      .post("/api/shopping-carts")
      .end((err, res) => {
        res.body.shoppingCart.should.be.a('object');
        done();
      });
  });
  it("should return a 201 after creating a new shopping-cart using POST", (done) => {
    chai.request(apiServer)
      .post("/api/shopping-carts")
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  //PUT will allow items to be added to the cart
  it("should return a 202 after successfully placing items into a cart", (done) => {
    let cartId = "";
    let items = ["A", "B", "C"];
    chai.request(apiServer)
      .post("/api/shopping-carts")
      .end((err, res) => {
        cartId = res.body.shoppingCart.id;
        chai.request(apiServer)
          .put("/api/shopping-carts/" + cartId)
          .send({ "items" : items })
          .end((err, res) => {
            res.should.have.status(202);
          });
        done();
      });
  });
  it("should make shoppingCart's total = 32.40", (done) => {
    let cartId = "";
    let items = ["A", "B", "C", "D", "A", "B", "A", "A"];
    chai.request(apiServer)
      .post("/api/shopping-carts")
      .end((err, res) => {
        cartId = res.body.shoppingCart.id;
        chai.request(apiServer)
          .put("/api/shopping-carts/" + cartId)
          .send({ "items" : items })
          .end((err, res) => {
            res.body.shoppingCart.total.should.equal(32.4);
          });
        done();
      });
  });
  it("should make shoppingCart's total = 7.25", (done) => {
    let cartId = "";
    let items = ["C", "C", "C", "C", "C", "C", "C"];
    chai.request(apiServer)
      .post("/api/shopping-carts")
      .end((err, res) => {
        cartId = res.body.shoppingCart.id;
        chai.request(apiServer)
          .put("/api/shopping-carts/" + cartId)
          .send({ "items" : items })
          .end((err, res) => {
            res.body.shoppingCart.total.should.equal(7.25);
          });
        done();
      });
  });
  it("should make shoppingCart's total = 15.40", (done) => {
    let cartId = "";
    let items = ["A", "B", "C", "D"];
    chai.request(apiServer)
      .post("/api/shopping-carts")
      .end((err, res) => {
        cartId = res.body.shoppingCart.id;
        chai.request(apiServer)
          .put("/api/shopping-carts/" + cartId)
          .send({ "items" : items })
          .end((err, res) => {
            res.body.shoppingCart.total.should.equal(15.40);
          });
        done();
      });
  });
});
