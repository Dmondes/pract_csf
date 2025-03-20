import {Injectable, inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order, Product} from "./models";
import { Router } from "@angular/router";

@Injectable()
export class ProductService {

  private http = inject(HttpClient)
  private router = inject(Router)


  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  getProductCategories(): Observable<string[]> {
    return this.http.get<string[]>('/api/categories')
  }

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`/api/category/${category}`)
  }

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  checkout(order: Order) {
    // TODO Task 3
     this.http.post<string>(`/api/order`, order, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    ).subscribe({
      next: (response) => {
        // Parse the response string to get the order ID
        try {
          const responseObj = JSON.parse(response);
          alert(`Order placed successfully! Order ID: ${responseObj.orderId}`);
          // Navigate to View 0 (product list page)
          this.router.navigate(['/']);
        } catch (e) {
          alert('Error processing response');
        }
      },
      error: (error) => {
        // Handle error response
        try {
          const errorMsg = JSON.parse(error.error);
          alert(`Error: ${errorMsg.message || 'Unknown error occurred'}`);
        } catch (e) {
          alert(`Error: ${error.message || 'Unknown error occurred'}`);
        }
      }
    });
  }
}
