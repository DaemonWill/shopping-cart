const uuid = require("uuid/v4");
const express = require("express");
const shoppingCartsRouter = express.Router();
const shoppingCarts = require("../db/shopping-carts");
const shoppingCartsEndpoint = "/api/shopping-carts";
const items = require("../db/items");
const calculateCartTotal = require("../utils/calculateCartTotal");

//GET all shopping-carts listed in the local dummy db
shoppingCartsRouter.get(shoppingCartsEndpoint, (req,res) => {
  res.status(200).send({
    success : true,
    message : "success",
    shoppingCarts : shoppingCarts
  })
});

//GET a specific shopping-cart by id
shoppingCartsRouter.get(shoppingCartsEndpoint + "/:id", (req,res) => {
  //setup an obj to return if the id matches an obj in the db
  let cart = shoppingCarts.find((cart) => {
    return (cart.id == req.params.id);
  });
  //return a 200 and the obj above if a match exists
  if(cart){
    return res.status(200).send({
      success : true,
      message : "successfully retrieved a shopping cart",
      shoppingCart : cart
    })
  }
  //return a 404
  else{
    return res.status(404).send({
      success : false,
      message : "no cart was found"
    })
  }
});

//Create a new shopping-cart through POST
shoppingCartsRouter.post(shoppingCartsEndpoint, (req,res) => {
  //generate a random uuid for the new shopping-cart
  let id = uuid();
  //initialize a new object with the desired id and base props to add to the db
  let cart = {
    "id" : id,
    "items" : [],
    "total" : null
  };
  shoppingCarts.push(cart);
  return res.status(201).send({
    success : true,
    message : "a new shopping cart has been successfully created",
    shoppingCart : cart
  });
});

//Add items to a shopping cart through PUT
//req.body must have an "items" attr with an array of item ids
shoppingCartsRouter.put(shoppingCartsEndpoint + "/:id", (req,res) => {
  let cartIndex = shoppingCarts.findIndex((cart) => {
    return (cart.id == req.params.id);
  });
  //return 404, cart not found
  if(cartIndex == -1){
    return res.status(404).send({
      success : false,
      message : "no cart was found"
    })
  }
  //return 400, no items specified
  if(!req.body.items || !req.body.items.length || req.body.items.length == 0){
    return res.status(400).send({
      success : false,
      message : "items to add have not been properly specified"
    })
  }
  try{
    //if applicable, add each item to the shopping cart and update total
    for(let itemId of req.body.items){
      let item = items.find((item) => {
        return (item.id == itemId);
      });
      if(item){
        shoppingCarts[cartIndex].items.push(item);
      }
    }
    //update cart's total and return a 202
    shoppingCarts[cartIndex].total = calculateCartTotal(shoppingCarts[cartIndex]);
    return res.status(202).send({
      success : true,
      message : "the cart has been updated",
      shoppingCart : shoppingCarts[cartIndex]
    });
  }
  catch(error){
    //return a 500
    return res.status(500).send({
      success : false,
      message : "unexpected error"
    })
  }
});

module.exports = shoppingCartsRouter;
