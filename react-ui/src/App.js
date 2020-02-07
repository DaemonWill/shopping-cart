import React from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ItemCard from './components/item-card/Item-Card';
import ItemModal from './components/item-modal/Item-Modal';
import CartModal from './components/cart-modal/Cart-Modal';
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
  };

  //create new cart using the api
  assignCart(){
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

  //populate the store's items from the db if not already populated
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

  //Create a ui list of item-cards given the current items in the store
  generateItemCards(){
    let itemCards = [];
    if(this.state.items){
      for(let item of this.state.items){
        itemCards.push(
          <ItemCard item = {item}
                    onSelectItem = {this.onSelectItem}
                    onItemModalToggle = {this.onItemModalToggle}
          ></ItemCard>
        );
      }
    }
    return itemCards;
  }

  //have the api update the cart (as well as update the cart in state)
  addItemsToCart = (itemList) => {
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

  //set the state's selectedItem to the item-card that tirggers this
  onSelectItem = (item) => {
    this.setState({
      selectedItem : item
    });
  }

  //toggle the bool that controls item modal visibility
  onItemModalToggle = () => {
    this.setState({
      itemModal : !this.state.itemModal
    });
  }

  //toggle the bool that controls cart modal visibility
  onCartModalToggle = () => {
    this.setState({
      cartModal : !this.state.cartModal
    });
  }

  //set the total item amount cost of the state's selectedItem for viewing in the item modal
  onUpdateTotalItemCost = (itemCount) => {
    this.setState({
      totalItemCost : calculateTotal(this.state.selectedItem, itemCount)
    });
  }

	render() {
    this.assignCart();
    this.assignItems();
		return (
			<div className="app-body">
        <Header shoppingCart = {this.state.shoppingCart}
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
        <CartModal  shoppingCart = {this.state.shoppingCart}
                    showModal = {this.state.cartModal}
                    onCartModalToggle = {this.onCartModalToggle}
        ></CartModal>
			</div>
		);
	};
}

export default App;
