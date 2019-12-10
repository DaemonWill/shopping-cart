import { Component, OnInit } from '@angular/core';
import { ShoppingCartApiService } from './services/shopping-cart-api.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private shoppingCartApiService : ShoppingCartApiService,
              private storageService : StorageService){};

  ngOnInit(){
    document.title = "Shopping Cart";
    this.assignItems();
    this.assignCart();
  }

  items : any[] = [];
  shoppingCart : any = this.storageService.getCurrentCart();

  assignItems() : void {
    this.shoppingCartApiService.getData("items").subscribe({
      next : data => {
        this.items = data.items;
      },
      error : response => {
        alert(response.error.message || response.error);
      }
    });
  }

  assignCart() : void {
    if(!this.shoppingCart){
      //create new cart using the api, then store it in sessionStorage
      this.shoppingCartApiService.postData("shopping-carts", {}).subscribe({
        next : data => {
          this.shoppingCart = data.shoppingCart;
          this.storageService.setCurrentCart(this.shoppingCart);
        },
        error : response => {
          alert(response.error.message || response.error);
        }
      });
    }
  }
}
