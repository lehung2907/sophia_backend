import { Component, OnInit } from '@angular/core';
import { ShopService, CartItem } from '../shop.service';
import { sophiaAnimations } from "../../../shared/animations/sophia-animations";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [sophiaAnimations]
})
export class CartComponent implements OnInit {
  public cart: CartItem[];
  public total: number;
  public subTotal: number;
  public vat: number = 15;
  constructor(
    private shopService: ShopService
  ) { }

  ngOnInit() {
    this.getCart();
    this.onQuantityChange();
  }
  getCart() {
    this.shopService
    .getCart()
    .subscribe(cart => {
      this.cart = cart;
    })
  }
  removeProduct(cartItem) {
    this.shopService
    .removeFromCart(cartItem)
    .subscribe(res => {
      this.cart = res;
    })
  }
  onQuantityChange() {
    this.subTotal = 0;
    this.cart.forEach(item => {
      this.subTotal += (item.product.price.sale * item.data.quantity)
    })
    this.total = this.subTotal + (this.subTotal * (15/100))
  }

}
