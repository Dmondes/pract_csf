import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cart, Order } from '../models';
import { ProductService } from '../product.service';
import { CartStore } from '../cart.store';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit {

  // TODO Task 3
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private cartStore= inject(CartStore);

  form!: FormGroup
  cart!: Cart;
  totalCost: number = 0;


  ngOnInit(): void {
    this.form = this.fb.group({
          name: this.fb.control<string>("", [ Validators.required]),
          address: this.fb.control<string>("", [ Validators.required, Validators.min(3) ]),
          priority: this.fb.control<boolean>(false),
          comments: this.fb.control<string>("")
        })
        this.cartStore.viewCart.subscribe(cart => {
          this.cart = cart;
          this.calculateTotal();
        });
  }
  calculateTotal(): void {
    let sum = 0;
    for (let i = 0; i < this.cart.lineItems.length; i++) {
      const currentItem = this.cart.lineItems[i];
      const itemCost = currentItem.price * currentItem.quantity;
      sum = sum + itemCost;
    }
    this.totalCost = sum;
  }

  placeOrder(){
    const newOrder: Order = {
      name: this.form.value['name'],
      address: this.form.value['address'],
      priority: this.form.value['priority'],
      comments: this.form.value['comments'],
      cart: this.cart
    }
    this.productService.checkout(newOrder);
    alert("posted")
    console.log("Posted")
  }
}
