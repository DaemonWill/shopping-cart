const express = require("express");
const bodyParser = require("body-parser");
const items = require("./db/items");
const PORT = 5000;
const APP = express();

//parse request data
APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({
  extended: false
}));

//initial endpoint setup for the api
//GET all items listed in the local dummy db
APP.get('/api/items', (req,res) => {
  res.status(200).send({
    success: true,
    message: "success",
    items: items
  })
});

APP.listen(PORT, () => {
  console.log("api running on port : " + PORT);
});

module.exports = APP;
