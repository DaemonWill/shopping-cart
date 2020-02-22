import React, { useState, useEffect } from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ItemCard from './components/item-card/Item-Card';
import ItemModal from './components/item-modal/Item-Modal';
import CartModal from './components/cart-modal/Cart-Modal';
import ShoppingCartService from './services/shopping-cart-service';
import logo from './logo.svg';
import './App.css';
const shoppingCartService = new ShoppingCartService();

export default function App(){
  //define initial state values
  const [shoppingCart, setShoppingCart] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemModal, toggleItemModal] = useState(false);
  const [showCartModal, toggleCartModal] = useState(false);
  const [totalItemCost, setTotalItemCost] = useState(0);

  //upon initialization, fetch the shoppingCart and items from the API
  useEffect(() => {
    assignCart();
    assignItems();
  }, []);

  //create new cart using the API
  const assignCart = function(){
    shoppingCartService.postData("shopping-carts", {})
      .then((response) => {
        //upon a successful response, set the app's shoppingCart obj
        setShoppingCart(response.data.shoppingCart);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message || err.error);
      })
  }

  //populate the store's items from the db if not already populated
  const assignItems = function(){
    shoppingCartService.getData("items")
      .then((response) => {
        //upon successful response, populate the items obj in state
        setItems(response.data.items);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message || err.error);
      })
  }

  //have the api update the current cart in state
  const addItemsToCart = function(itemList){
    let endpoint = "shopping-carts/" + shoppingCart.id;
    shoppingCartService.putData(endpoint, {"items" : itemList})
      .then((response) => {
        setShoppingCart(response.data.shoppingCart);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message || err.error);
      })
  }

  return (
    <div className="app-body">
      <Header shoppingCart = {shoppingCart}
              showCartModal = {showCartModal}
              toggleCartModal = {toggleCartModal}
      ></Header>
      <div className="col-12 card-deck item-cards">
        {items.map((item) => {
          return (
            <ItemCard item = {item}
                      setSelectedItem = {setSelectedItem}
                      showItemModal = {showItemModal}
                      toggleItemModal = {toggleItemModal}
            ></ItemCard>
          )
        })}
      </div>
      <Footer></Footer>
      <ItemModal selectedItem = {selectedItem}
                  showItemModal = {showItemModal}
                  toggleItemModal = {toggleItemModal}
                  totalItemCost = {totalItemCost}
                  setTotalItemCost = {setTotalItemCost}
                  addItemsToCart = {addItemsToCart}
      ></ItemModal>
      <CartModal shoppingCart = {shoppingCart}
                  showCartModal = {showCartModal}
                  toggleCartModal = {toggleCartModal}
      ></CartModal>
    </div>
  )
}
