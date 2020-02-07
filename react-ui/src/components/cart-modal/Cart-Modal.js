import React from 'react';
import './Cart-Modal.css';
import Currency from 'react-currency-formatter';
import calculateRoughTotal from '../../utils/calculateRoughTotal';

class CartModal extends React.Component {
  //list off each item assigned to the cart in the ui
  generateCartItems(){
    let cartItems = [];
    for(let item of this.props.shoppingCart.items){
      cartItems.push(
        <div className="mb-4">
          <b className="d-inline mr-2">{item.description} - </b>
          <p className="d-inline"> Unit Price: </p>
          <b className="d-inline item-price">
            <Currency quantity={item.unit_price} currency="USD"/>
          </b>
        </div>
      );
    }
    return cartItems;
  }

  //reload cart app with fresh cart (leaving room for clearing cache and db cart)
  onClearCart(){
    window.location.reload();
  }

  render(){
    let modalBody;
    let modalStyle = (this.props.showModal) ? { display: "block" } : { display: "none" };

    if(this.props.shoppingCart){
      modalBody = (
        <div className="modal-body row">
          <div className="col-md-7 col-12 item-list">
            {this.generateCartItems()}
          </div>
          <div className="col-md-5 col-12 clear-cart">
            <div className="mb-2">
              <b className="d-inline">Total : </b>
              <b className="d-inline total-price">
                <Currency quantity={this.props.shoppingCart.total || 0} currency="USD"/>
              </b>
            </div>
            <div className="mb-4">
              <b className="d-inline">Saved : </b>
              <b className="d-inline saved-price">
                <Currency quantity={calculateRoughTotal(this.props.shoppingCart) - this.props.shoppingCart.total || 0} currency="USD"/>
              </b>
            </div>
            <button className="btn btn-md btn-warning clear-btn" onClick={this.onClearCart}>Clear Cart</button>
            <button className="btn btn-md btn-danger cancel-btn" onClick={this.props.onCartModalToggle}>Cancel</button>
          </div>
        </div>
      )
    }

    return (
      <div className="modal" id="cartModal" tabindex="-1" style={modalStyle}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div className="modal-header">
              <h4 className="header">Your Cart</h4>
            </div>
            {modalBody}
          </div>
        </div>
      </div>
    );
  }
}

export default CartModal;
