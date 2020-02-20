import React from 'react';
import './Header.css';

export default function Header(props){
  //initialize the conditional ui element
  let cartIcon;

  //trigger upon the user clicking the cart-icon element, toggle cart modal
  const handleClick = function(){
    props.toggleCartModal(!props.showCartModal);
  }

  //generate the conditional element if the shoppingCart prop is loaded
  if(props.shoppingCart){
    cartIcon = (
      <h5 className="cart-icon" onClick={handleClick}>
        <i className="fas fa-shopping-cart cart-icon"></i>
        <span className="badge badge-pill badge-warning cart-badge">
          {props.shoppingCart.items.length}
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
