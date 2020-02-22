import React from 'react';
import './Cart-Modal.css';
import Currency from 'react-currency-formatter';
import calculateRoughTotal from '../../utils/calculateRoughTotal';

export default function CartModal(props){
  //define/initialize some condional ui elements to be generated
  let modalBody;
  let modalStyle = (props.showCartModal) ? { display: "block" } : { display: "none" };

  //trigger when user clicks the cancel button, toggle cart modal
  const handleClick = function(){
    props.toggleCartModal(!props.showCartModal);
  }

  //reload cart app with fresh cart (leaving room for clearing cache and db cart)
  const onClearCart = function(){
    window.location.reload();
  }

  //condionally generate the modal-body if shoppingCart exists and is assigned
  if(props.shoppingCart){
    modalBody = (
      <div className="modal-body row">
        <div className="col-md-7 col-12 item-list">
          {props.shoppingCart.items.map((item) => {
            return (
              <div className="mb-4">
                <b className="d-inline mr-2">{item.description} - </b>
                <p className="d-inline"> Unit Price: </p>
                <b className="d-inline item-price">
                  <Currency quantity={item.unit_price} currency="USD"/>
                </b>
              </div>
            )
          })}
        </div>
        <div className="col-md-5 col-12 clear-cart">
          <div className="mb-2">
            <b className="d-inline">Total : </b>
            <b className="d-inline total-price">
              <Currency quantity={props.shoppingCart.total || 0} currency="USD"/>
            </b>
          </div>
          <div className="mb-4">
            <b className="d-inline">Saved : </b>
            <b className="d-inline saved-price">
              <Currency quantity={calculateRoughTotal(props.shoppingCart) - props.shoppingCart.total || 0} currency="USD"/>
            </b>
          </div>
          <button className="btn btn-md btn-warning clear-btn" onClick={onClearCart}>Clear Cart</button>
          <button className="btn btn-md btn-danger cancel-btn" onClick={handleClick}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal" id="cartModal" tabindex="-1" style={modalStyle}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="header">Your Cart</h4>
          </div>
          {modalBody}
        </div>
      </div>
    </div>
  )
}
