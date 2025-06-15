// src/app/services/cart.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Product } from '../../models/Product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private authService: AuthService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  private getCartKey(): string {
    if (!this.isBrowser) return 'cart_guest';
    
    const user = this.authService.getCurrentUser();
    return user ? `cart_${user.getEmail()}` : 'cart_guest';
  }

  addToCart(product: Product): void {
    if (!this.isBrowser) return;

    const cartItems = this.getCartItems();
    const existingItem = cartItems.find(item => item.productId === product.productId);
    
    if (existingItem) {
      existingItem.setQuantity(existingItem.getQuantity() + 1);
    } else {
      cartItems.push(Product.fromObject({
        ...product,
        quantity: 1
      }));
    }
    this.saveCart(cartItems);
  }

  private loadCart(): Product[] {
    if (!this.isBrowser) return [];
    
    try {
      const savedCart = localStorage.getItem(this.getCartKey());
      return savedCart 
        ? JSON.parse(savedCart).map((item: any) => Product.fromObject(item))
        : [];
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
      return [];
    }
  }

  removeFromCart(productId: number): void {
    if (!this.isBrowser) return;

    const cartItems = this.getCartItems().filter(item => item.getProductId() !== productId);
    this.saveCart(cartItems);
  }

  getCartItems(): Product[] {
    return [...this.loadCart()];
  }

  getTotal(): number {
    return this.getCartItems().reduce(
      (total, item) => total + (item.getProductPrice() * item.getQuantity()), 
      0
    );
  }

  clearCart(): void {
    if (!this.isBrowser) return;
    this.saveCart([]);
  }

  private saveCart(items: Product[]): void {
    if (!this.isBrowser) return;
    
    try {
      localStorage.setItem(this.getCartKey(), JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }
}