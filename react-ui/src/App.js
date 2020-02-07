import React from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ItemCard from './components/item-card/Item-Card';
import ShoppingCartService from './services/shopping-cart-service';
import logo from './logo.svg';
import './App.css';
const shoppingCartService = new ShoppingCartService();

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shoppingCart : null,
      items : null
    }
  };

  assignCart(){
    //create new cart using the api, then store it in sessionStorage
    if(!this.state.shoppingCart){
      shoppingCartService.postData("shopping-carts", {})
        .then((response => {
          this.setState({
            shoppingCart : response.data.shoppingCart
          });
        }))
        .catch((err) => {
          console.log(err);
        })
    }
  }

  assignItems(){
    if(!this.state.items){
      shoppingCartService.getData("items")
        .then((response => {
          this.setState({
            items : response.data.items
          });
        }))
        .catch((err) => {
          console.log(err);
        })
    }
  }

  //Create a list of item-cards given the current items in the cart
  generateItemCards(){
    let itemCards = [];
    if(this.state.items){
      for(let item of this.state.items){
        itemCards.push(
          <ItemCard item = {item}></ItemCard>
        );
      }
    }
    return itemCards;
  }

	render() {
    console.log(shoppingCartService);
    this.assignCart();
    this.assignItems();
		return (
			<div className="app-body">
        <Header shoppingCart = {this.state.shoppingCart} ></Header>
        <div class="col-12 card-deck item-cards">
          {this.generateItemCards()}
        </div>
				<Footer></Footer>
			</div>
		);
	};
}

export default App;
