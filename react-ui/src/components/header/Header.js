import React from 'react';
import './Header.css';

class Header extends React.Component {
  render(){
    let cartIcon;
    //try to render only if a shoppingCart object was fetched from the api
    if(this.props.shoppingCart){
      cartIcon =  (
        <h5 className="cart-icon" onClick={this.props.onCartModalToggle}>
          <i className="fas fa-shopping-cart cart-icon"></i>
          <span className="badge badge-pill badge-warning cart-badge">
            {this.props.shoppingCart.items.length}
          </span>
        </h5>
      );
    }

    return (
      <div className="col-12 header">
        <h2 className="header">Shopping Cart</h2>
        {cartIcon}
      </div>
    );
  }
};

export default Header;
