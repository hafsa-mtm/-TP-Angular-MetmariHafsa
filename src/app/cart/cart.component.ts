// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../../models/Product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.cartItems.forEach(item => {
      this.quantities[item.productId] = item.quantity || 1;
    });
  }

  // cart.component.ts
updateQuantity(productId: number): void {
  const newQuantity = this.quantities[productId];
  if (newQuantity < 1) {
    this.quantities[productId] = 1; // Reset to minimum 1
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

  checkout(): void {
    // In a real app, this would navigate to checkout
    alert('Proceeding to checkout!');
  }
}