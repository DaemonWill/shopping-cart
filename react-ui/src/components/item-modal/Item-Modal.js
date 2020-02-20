import React from 'react';
import './Item-Modal.css';
import calculateTotal from '../../utils/calculateTotal';
import Currency from 'react-currency-formatter';

export default function ItemModal(props){
  //initialize/define conditional styling options for the modal
  let modalBody;
  let modalStyle = (props.showItemModal) ? { display: "block" } : { display: "none" };

  //triggers upon a user updating the total item amount, update totalItemCost
  const updateTotalItemCost = function(event){
    props.setTotalItemCost(calculateTotal(props.selectedItem, event.target.value));
  }

  //triggers upon a user clicking the add button, validate the item count and update the items in cart
  const onAddItemsToCart = function(){
    //setup a list of item ids to update the cart in the db
    let itemList = [];
    let itemAmount = parseInt(document.getElementById("amount").value);
    if(itemAmount <= 0){
      alert("invalid item amount");
      return;
    }
    for(let count = 0; count < itemAmount; count++){
      itemList.push(props.selectedItem.id);
    }
    //use the shoppingCart service to update the items in the carts
    props.addItemsToCart(itemList);
    //hide the modal after the operation
    props.toggleItemModal(!props.showItemModal);
  }

  //generate the modalbody element if the selectedItem exists and has been assigned
  if(props.selectedItem){
    modalBody = (
      <div className="modal-body">
        <div className="item-details">
          <form>
            <div>
              <b className="d-inline mr-2">Item : </b>
              <p className="d-inline">{props.selectedItem.description}</p>
            </div>
            <div>
              <b className="d-inline mr-2"> Amount : </b>
              <input type="number" className="form-control d-inline input-amount" name="amount"
                      id="amount" min="0" required onChange={updateTotalItemCost}/>
            </div>
          </form>
        </div>
        <div className="total-cost">
          <b className="d-inline">Total Price : </b>
          <b className="d-inline total-price">
            <Currency quantity={props.totalItemCost} currency="USD"/>
          </b>
        </div>
        <button className="btn btn-md btn-warning add-btn" onClick={onAddItemsToCart}>Add</button>
        <button className="btn btn-md btn-danger cancel-btn" onClick={props.toggleItemModal}>Cancel</button>
      </div>
    );
  }

  return (
    <div className="modal" id="itemModal" tabindex="-1" style={modalStyle}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="header">Add to Cart</h4>
          </div>
          {modalBody}
        </div>
      </div>
    </div>
  )
}
