import React from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ItemCard from './components/item-card/Item-Card';
import ItemModal from './components/item-modal/Item-Modal';
import ShoppingCartService from './services/shopping-cart-service';
import calculateTotal from './utils/calculateTotal';
import logo from './logo.svg';
import './App.css';
const shoppingCartService = new ShoppingCartService();

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shoppingCart : null,
      items : null,
      selectedItem : null,
      itemModal : false,
      cartModal : false,
      totalItemCost : 0
    };
    this.onSelectItem = this.onSelectItem.bind(this);
    this.onItemModalToggle = this.onItemModalToggle.bind(this);
    this.onCartModalToggle = this.onCartModalToggle.bind(this);
    this.onUpdateTotalItemCost = this.onUpdateTotalItemCost.bind(this);
    this.addItemsToCart = this.addItemsToCart.bind(this);
  };

  assignCart(){
    //create new cart using the api
    if(!this.state.shoppingCart){
      shoppingCartService.postData("shopping-carts", {})
        .then((response) => {
          this.setState({
            shoppingCart : response.data.shoppingCart
          });
        })
        .catch((err) => {
          console.log(err);
          alert(err.message || err.error);
        })
    }
  }

  assignItems(){
    if(!this.state.items){
      shoppingCartService.getData("items")
        .then((response) => {
          this.setState({
            items : response.data.items
          });
        })
        .catch((err) => {
          console.log(err);
          alert(err.message || err.error);
        })
    }
  }

  addItemsToCart(itemList){
    //have the api update the cart
    let endpoint = "shopping-carts/" + this.state.shoppingCart.id;
    shoppingCartService.putData(endpoint, {"items" : itemList})
      .then((response) => {
        this.setState({
          shoppingCart : response.shoppingCart
        });
      })
      .catch((err) => {
        console.log(err);
        alert(err.message || err.error);
      })
  }

  onSelectItem(item){
    this.setState({
      selectedItem : item
    });
  }

  onItemModalToggle(){
    this.setState({
      itemModal : !this.state.itemModal
    });
  }

  onCartModalToggle(){
    this.setState({
      cartModal : !this.state.cartModal
    });
  }

  onUpdateTotalItemCost(itemCount){
    this.setState({
      totalItemCost : calculateTotal(this.state.selectedItem, itemCount)
    });
  }

  //Create a list of item-cards given the current items in the cart
  generateItemCards(){
    let itemCards = [];
    if(this.state.items){
      for(let item of this.state.items){
        itemCards.push(
          <ItemCard item = {item}
                    onSelectItem = {this.onSelectItem}
                    itemModal = {this.state.itemModal}
                    onItemModalToggle = {this.onItemModalToggle}
          ></ItemCard>
        );
      }
    }
    return itemCards;
  }

	render() {
    this.assignCart();
    this.assignItems();
		return (
			<div className="app-body">
        <Header shoppingCart = {this.state.shoppingCart}
                cartModal = {this.state.cartModal}
                onCartModalToggle = {this.onCartModalToggle}
        ></Header>
        <div class="col-12 card-deck item-cards">
          {this.generateItemCards()}
        </div>
				<Footer></Footer>
        <ItemModal  item = {this.state.selectedItem}
                    showModal = {this.state.itemModal}
                    onItemModalToggle = {this.onItemModalToggle}
                    totalItemCost = {this.state.totalItemCost}
                    onUpdateTotalItemCost = {this.onUpdateTotalItemCost}
                    addItemsToCart = {this.addItemsToCart}
        ></ItemModal>
			</div>
		);
	};
}

export default App;
