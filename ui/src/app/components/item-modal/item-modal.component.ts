import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartApiService } from '../../services/shopping-cart-api.service';
import {StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.css']
})
export class ItemModalComponent implements OnInit {
  constructor(private shoppingCartApiService : ShoppingCartApiService,
              private storageService : StorageService) { }

  ngOnInit() {
  }

  @Input() item : any = null;
  shoppingCart : any = this.storageService.getCurrentCart();
  itemAmount : number = 0;

  addToCart() : void {
    //setup a list of item ids to update the cart in the db
    let itemList = [];
    for(let count = 0; count < this.itemAmount; count++){
      itemList.push(this.item.id);
    }
    //have the api update the cart, then update sessionStorage
    let endpoint = "shopping-carts/" + this.shoppingCart.id;
    this.shoppingCartApiService.putData(endpoint, {"items" : itemList}).subscribe({
      next : data => {
        this.shoppingCart = data.shoppingCart;
        this.storageService.setCurrentCart(this.shoppingCart);
        location.reload();
      },
      error : response => {
        alert(response.error.message || response.error);
      }
    });
  }

  calculateTotal() : number {
    let total = 0;
    let amount = this.itemAmount;
    //sort discounts from greatest number to least number
    let discounts = this.item.volume_discounts.sort((a,b) => {
      let val = 0;
      val = (a.number > b.number) ? -1 : val;
      val = (a.number < b.number) ? 1 : val;
      return val;
    });
    //apply discounted (if applicable) prices to total
    if(discounts.length > 0 && amount >= discounts[discounts.length - 1].number){
      for(let d = 0; d < discounts.length; d++){
        if(amount >= discounts[d].number){
          total += Math.floor(amount / discounts[d].number) * discounts[d].price;
          //dwindle down itemAmount after discount
          amount = amount % discounts[d].number;
          //apply the regular price to the remainder if no other discounts are present
          if(d == discounts.length - 1){
            total += amount * this.item.unit_price;
          }
        }
      }
    }
    //apply the normal unit price
    else{
      total += amount * this.item.unit_price;
    }
    return total;
  }
}
