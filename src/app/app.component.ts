import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule], // Add RouterLink and CommonModule
  template: `
    <header>
      <a routerLink="/">Home</a> |
      <a routerLink="/login">Login</a> |
      <a routerLink="/cart" class="cart-link">
        🛒 Cart 
        <span *ngIf="cartService.getCartItems().length > 0" class="cart-count">
          ({{ cartService.getCartItems().length }})
        </span>
      </a>
    </header>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .cart-link {
      text-decoration: none;
      color: inherit;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    
    .cart-count {
      background: #1976d2;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    
    header {
      padding: 1rem;
      background: #f5f5f5;
      margin-bottom: 2rem;
      font-family: Arial, sans-serif;
    }
    
    header a {
      margin: 0 0.5rem;
      color: #333;
      text-decoration: none;
    }
    
    header a:hover {
      text-decoration: underline;
    }
  `]
})
export class AppComponent {
  title = 'tp4';
  constructor(public cartService: CartService) {}
}