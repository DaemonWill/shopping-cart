import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css']
})
export class CartModalComponent implements OnInit {
  constructor(private storageService : StorageService) { }

  ngOnInit() {
  }

  shoppingCart : any = this.storageService.getCurrentCart();

  //return the total from all the items' unit costs without discount
  calculateRoughTotal() : number {
    let total = 0;
    for(let i of this.shoppingCart.items){
      total += i.unit_price;
    }
    return total;
  }

  //remove cart from cache and start with new cart
  clearCart(){
    this.storageService.setCurrentCart(null);
    location.reload();
  }
}
