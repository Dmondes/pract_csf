
// TODO Task 2

import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Cart, LineItem } from "./models";

const INIT: Cart = {
    lineItems: []
}
// Use the following class to implement your store
@Injectable({ providedIn: 'root' })
export class CartStore extends ComponentStore<Cart> {

    constructor() { super(INIT) }

    readonly addToCart = this.updater<LineItem>(
        (store: Cart, newItem: LineItem) => {
            return {
                lineItems: [...store.lineItems, newItem]
            } as Cart
        }
    )

    readonly deleteItem = this.updater<LineItem>(
        (store: Cart, itemToDelete: LineItem) => {
            return {
                lineItems: store.lineItems.filter(i => i != itemToDelete)
            }
        }
    )
    readonly countItemsInCart = this.select<number>(
        (store: Cart) => store.lineItems.length
    )

    readonly viewCart = this.select(
        state => state
    )
}





