import React from 'react';
import './Item-Card.css';
import Currency from 'react-currency-formatter';

class ItemCard extends React.Component {
  //list off the applicable discounts for each item
  generateVolumeDiscounts(){
    let volumeDiscounts = [];
    for(let d of this.props.item.volume_discounts){
      volumeDiscounts.push(
        <div>
          <b className="d-inline">{d.number} </b>
          <p className="d-inline">for </p>
          <b className="d-inline">
            <Currency quantity={d.price} currency="USD"/>
          </b>
        </div>
      );
    }
    return volumeDiscounts;
  }

  openAddItemModal(){
    //do something
  }

  render(){
    let cardHeader, unitPrice;
    if(this.props.item.description){
      cardHeader = (
        <div className="card-header">
          <h4 className="item-description">{this.props.item.description}</h4>
        </div>
      );
    }
    if(this.props.item.unit_price){
      unitPrice = (
        <div>
          <b className="d-inline">1 </b>
          <p className="d-inline">for </p>
          <b className="d-inline">
            <Currency quantity={this.props.item.unit_price} currency="USD"/>
          </b>
        </div>
      );
    }
    return (
      <div className="card">
        {cardHeader}
        <div className="card-body">
          {unitPrice}
          {this.generateVolumeDiscounts()}
        </div>
        <button className="btn btn-primary btn-md item-btn" onClick={this.openAddItemModal}>Add Item</button>
      </div>
    );
  }
}

export default ItemCard;
