const express = require("express");
const bodyParser = require("body-parser");
const itemsRouter = require("./routes/items-route");
const shoppingCartsRouter = require("./routes/shopping-carts-route");
const app = express();
//TODO possibly place in a config file with a separate PORT for testing
const PORT = 5000;

//parse request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
//allow endpoints handled by each of the router modules
app.use(itemsRouter);
app.use(shoppingCartsRouter);

app.listen(PORT, () => {
  console.log("api running on port : " + PORT);
});

module.exports = app;
