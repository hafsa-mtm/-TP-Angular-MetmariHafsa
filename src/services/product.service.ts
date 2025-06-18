// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../models/Product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api';
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`).pipe(
      map(products => products.map(p => new Product(
      p.productId,
      p.productTitle,
      p.productPrice,
      p.quantity,
      p.description,
      p.imageUrl,
      p.category
)))
    )
  }

  loadProducts(): void {
    this.getProducts().subscribe(products => {
      this.productsSubject.next(products);
    });
  }

  updateProductQuantity(productId: number, quantityChange: number): void {
    const currentProducts = this.productsSubject.getValue();
    const updatedProducts = currentProducts.map(product => {
      if (product.productId === productId) {
        const newQuantity = product.quantity - quantityChange;
        return new Product(
          product.productId,
          product.productTitle,
          product.productPrice,
          newQuantity >= 0 ? newQuantity : 0,
          product.description,
          product.imageUrl,
          product.category
        );
      }
      return product;
    });
    this.productsSubject.next(updatedProducts);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }
}