import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // This is crucial
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {} // HttpClient must be injected

  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`).pipe(
    map(products => products.map(p => new Product(
      p.productId,
      p.productTitle,
      p.productPrice,
      p.quantity,
      p.description,
      p.imageUrl,
      p.category  // include the category
    ))))
  }
getProductById(id: number): Observable<Product | undefined> {
  return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
}

}