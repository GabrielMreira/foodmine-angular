import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/cart';
import { BehaviorSubject, Observable } from 'rxjs'
import { Food } from '../shared/models/food';
import { CartItem } from '../shared/models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject:BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  addToCart(food:Food):void{
    let cartItem = this.cart.items.find(items => items.food.id === food.id)
    if(cartItem)
      return

    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }

  removeFromCart(foodId: string):void{
    this.cart.items = this.cart.items.filter(items => items.food.id != foodId);
    this.setCartToLocalStorage();
  }

  changeQuantiy(foodId:string, quantit:number){
    let cartItem = this.cart.items.find(items => items.food.id === foodId);
    if(!cartItem)
      return;

    cartItem.quantity = quantit;
    cartItem.price = cartItem.food.price * quantit;
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart;
    this.setCartToLocalStorage();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage():void{
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevCount, currentCount) => prevCount + currentCount.quantity, 0)
    
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage():Cart{
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart;
  }
}
