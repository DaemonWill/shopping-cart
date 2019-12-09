const express = require("express");
const itemsRouter = express.Router();
const items = require("../db/items");

//GET all items listed in the local dummy db
itemsRouter.get('/api/items', (req,res) => {
  res.status(200).send({
    success: true,
    message: "success",
    items: items
  })
});

module.exports = itemsRouter;
