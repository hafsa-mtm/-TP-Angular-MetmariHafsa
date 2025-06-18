import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Product } from '../../models/Product';
import { AuthService } from './auth.service';
import { ProductService } from '../../services/product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private authService: AuthService,
    private productService: ProductService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  private getCartKey(): string {
    if (!this.isBrowser) return 'cart_guest';
    
    const user = this.authService.getCurrentUser();
    return user ? `cart_${user.getEmail()}` : 'cart_guest';
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

  getCartItems(): Product[] {
    return [...this.loadCart()];
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
    this.productService.updateProductQuantity(product.productId, 1);
  }

  removeFromCart(productId: number): void {
    if (!this.isBrowser) return;

    const cartItems = this.getCartItems();
    const item = cartItems.find(i => i.productId === productId);
    
    if (item) {
      const quantityToRestore = item.quantity;
      const updatedCart = cartItems.filter(item => item.productId !== productId);
      this.saveCart(updatedCart);
      this.productService.updateProductQuantity(productId, -quantityToRestore);
    }
  }

  updateQuantity(productId: number, quantity: number): void {
    if (!this.isBrowser) return;

    const cartItems = this.getCartItems();
    const item = cartItems.find(i => i.productId === productId);
    
    if (item) {
      const quantityChange = quantity - item.quantity;
      item.setQuantity(quantity);
      this.saveCart(cartItems);
      this.productService.updateProductQuantity(productId, quantityChange);
    }
  }

  getTotal(): number {
    return this.getCartItems().reduce(
      (total, item) => total + (item.productPrice * item.quantity), 
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