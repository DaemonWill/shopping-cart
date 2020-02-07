import React from 'react';
import './Item-Modal.css';
import Currency from 'react-currency-formatter';

class ItemModal extends React.Component {
  constructor(props){
    super(props);
  };

  //triggers after the item count input has been updated on the ui, update total item cost
  handleChange = (event) => {
    this.props.onUpdateTotalItemCost(event.target.value);
  }

  onAddItemsToCart = () => {
    //setup a list of item ids to update the cart in the db
    let itemList = [];
    let itemAmount = parseInt(document.getElementById("amount").value);
    if(itemAmount <= 0){
      alert("invalid item amount");
      return;
    }
    for(let count = 0; count < itemAmount; count++){
      itemList.push(this.props.item.id);
    }
    //use the shoppingCart service to update the items in the carts
    this.props.addItemsToCart(itemList);
    //hide the modal after the operation
    this.props.onItemModalToggle();
  }

  render(){
    let modalBody;
    let modalStyle = (this.props.showModal) ? { display: "block" } : { display: "none" };

    if(this.props.item){
      modalBody = (
        <div className="modal-body">
          <div className="item-details">
            <form>
              <div>
                <b className="d-inline mr-2">Item : </b>
                <p className="d-inline">{this.props.item.description}</p>
              </div>
              <div>
                <b className="d-inline mr-2">Amount : </b>
                <input type="number" className="form-control d-inline input-amount" name="amount" id="amount" min="0" required
                        onChange={this.handleChange}/>
              </div>
            </form>
          </div>
          <div className="total-cost">
            <b className="d-inline">Total Price : </b>
            <b className="d-inline total-price">
              <Currency quantity={this.props.totalItemCost} currency="USD"/>
            </b>
          </div>
          <button className="btn btn-md btn-warning add-btn" onClick={this.onAddItemsToCart}>Add</button>
          <button className="btn btn-md btn-danger cancel-btn" onClick={this.props.onItemModalToggle}>Cancel</button>
        </div>
      );
    }

    return (
      <div className="modal" id="itemModal" tabindex="-1" style={modalStyle}>
        <div className="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div className="modal-header">
              <h4 className="header">Add to Cart</h4>
            </div>
            {modalBody}
          </div>
        </div>
      </div>
    );
  }
}

export default ItemModal;
