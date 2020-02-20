import React from 'react';
import './Item-Card.css';
import Currency from 'react-currency-formatter';

export default function ItemCard(props){
  //initialize placeholder values for conditional ui elements
  let cardHeader, unitPrice;

  //generate a list of applicable discounts for each item in the ui
  const generateVolumeDiscounts = function(){
    let volumeDiscounts = [];
    for(let d of props.item.volume_discounts){
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

  //triggers upon clickint the add item button, set the selected item & open item-modal
  const handleClick = function(){
    props.setSelectedItem(props.item);
    props.toggleItemModal(!props.showItemModal);
  }

  //generate conditional ui elements as needed
  if(props.item && props.item.description){
    cardHeader = (
      <div className="card-header">
        <h4 className="item-description">{props.item.description}</h4>
      </div>
    );
  }
  if(props.item && props.item.unit_price){
    unitPrice = (
      <div>
        <b className="d-inline">1 </b>
        <p className="d-inline">for </p>
        <b className="d-inline">
          <Currency quantity={props.item.unit_price} currency="USD"/>
        </b>
      </div>
    );
  }

  return (
    <div className="card">
      {cardHeader}
      <div className="card-body">
        {unitPrice}
        {generateVolumeDiscounts()}
      </div>
      <button className="btn btn-primary btn-md item-btn" onClick={handleClick}>
        Add Item
      </button>
    </div>
  );
}
