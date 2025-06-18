// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../../models/Product';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  quantities: {[key: number]: number} = {};
  isLoading = false;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.cartItems.forEach(item => {
      this.quantities[item.productId] = item.quantity || 1;
    });
  }

  updateQuantity(productId: number): void {
    const newQuantity = this.quantities[productId];
    if (newQuantity < 1) {
      this.quantities[productId] = 1;
      return;
    }
    this.cartService.updateQuantity(productId, newQuantity);
    this.loadCart();
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  async checkout(): Promise<void> {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    this.isLoading = true;
    
    try {
      // In a real app, you would call a checkout API here
      // For now, we'll just simulate the process
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Navigate to checkout page
      this.router.navigate(['/checkout']);
      
      // Clear cart after successful checkout (you might want to do this after payment confirmation)
      // this.cartService.clearCart();
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }
}