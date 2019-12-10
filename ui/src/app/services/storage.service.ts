import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/*
* Singleton like service to be used to track activity/data throughout app lifecycle
*/
export class StorageService {
  constructor() { }

  private shoppingCart : any = null;

  /*
  * The Getters
  * first check if there is data stored in the current sessionStorage,
  * return sessionStorage data if present, if not return whatever is stored in the instance
  */
  public getCurrentCart() : any{
    let cart = (JSON.parse(sessionStorage.getItem("hasCurrentCart"))) ?
                JSON.parse(sessionStorage.getItem("currentCart")) : this.shoppingCart;
    return cart;
  }

  /*
  * The Setters
  * set the instance's private field with the data provided
  * then store that data into the sessionStorage for data persistance, and assign it a bool for checking
  */
  public setCurrentCart(cart: any) : void{
    this.shoppingCart = cart;
    //allow cart obj to persist after page refresh
    sessionStorage.setItem("currentCart", JSON.stringify(cart));
    sessionStorage.setItem("hasCurrentCart", "true");
  }
}
