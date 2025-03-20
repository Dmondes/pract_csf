import { Component, OnInit, inject } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import { LineItem } from './models';
import { CartStore } from './cart.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // NOTE: you are free to modify this component

  private router = inject(Router)
  private cartStore = inject(CartStore);

  private sub !: Subscription;

  itemCount!: number

  ngOnInit(): void {
    this.sub = this.cartStore.countItemsInCart.subscribe(
      count => this.itemCount = count
    );
  }

  checkout(): void {
    this.router.navigate([ '/checkout' ])
  }
}
