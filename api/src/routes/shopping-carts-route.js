const express = require("express");
const shoppingCartsRouter = express.Router();
const shoppingCarts = require("../db/shopping-carts");

//GET all shopping-carts listed in the local dummy db
shoppingCartsRouter.get('/api/shopping-carts', (req,res) => {
  res.status(200).send({
    success: true,
    message: "success",
    shoppingCarts: shoppingCarts
  })
});

module.exports = shoppingCartsRouter;
