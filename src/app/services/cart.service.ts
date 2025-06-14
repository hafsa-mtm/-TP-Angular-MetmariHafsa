import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Product } from '../../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    if (this.isBrowser) {
      this.loadCart();
    }
  }

  // Add or update product in cart
  addToCart(product: Product): void {
    const existingItem = this.cartItems.find(item => item.productId === product.productId);
    
    if (existingItem) {
      existingItem.setQuantity(existingItem.getQuantity() + 1);
    } else {
      this.cartItems.push(Product.fromObject({
        ...product,
        quantity: 1
      }));
    }
    this.saveCart();
  }

  // Load cart from localStorage
  private loadCart(): void {
    if (!this.isBrowser) return;
    
    try {
      const savedCart = localStorage.getItem('cart');
      this.cartItems = savedCart 
        ? JSON.parse(savedCart).map((item: any) => Product.fromObject(item))
        : [];
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
      this.cartItems = [];
    }
  }

  // Remove item from cart
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.getProductId() !== productId);
    this.saveCart();
  }

  // Get all cart items
  getCartItems(): Product[] {
    return [...this.cartItems]; // Return copy to prevent direct manipulation
  }

  // Calculate total price
  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.getProductPrice() * item.getQuantity()), 
      0
    );
  }

  // Clear cart
  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
  }

  // Save cart to localStorage
  private saveCart(): void {
    if (!this.isBrowser) return;
    
    try {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }
}