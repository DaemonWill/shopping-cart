# shopping-cart
A simple shopping cart api and ui using nodejs and angular

[![Build Status](https://travis-ci.com/DaemonWill/shopping-cart.svg?branch=master)](https://travis-ci.com/DaemonWill/shopping-cart)

Travis builds: https://travis-ci.com/DaemonWill/shopping-cart

## Overview
This repo contains two projects that go hand-in-hand, an api for managing/viewing shopping carts/purchasable items, and a ui for interacting with the api as a user

## Requirements

* npm version ^5.2 (in order to run npx)

## Setup

You can load each of the project dependencies by running an `npm install` in their root folders (/ui and /api)

## Using the API

After running `npm install` in the api directory, feel free to:
* run tests using : `npm test`
* start the server at port **5000** with `npm start`
* use a `GET` request to fetch all items from the local server data at the endpoint `/api/items`
* use a `GET` request to fetch all shoppingCarts from the local server data at the endpoint `/api/shopping-carts`
* use a `GET` request to fetch specific shoppingCart data with `/api/shopping-carts/:id`
* use a `POST` request to add a new shoppingCart at `/api/shopping-carts/`
* use a `PUT` request to update an existing shoppingCart's items at `/api/shopping-carts/:id` and passing in an `items : ["id1", "id2"]` key value pair to the req.body

## Using the UI

After running `npm install` in the ui directory, you can:
* run tests using : `npm test`
* start the server at port **4200** with `npm start`
* Add individual items to your shopping cart
* View how much you'll save by applying discounts
* Clear items from your cart
* View items from the API
* Fetch a shoppingCart from the api
* etc
