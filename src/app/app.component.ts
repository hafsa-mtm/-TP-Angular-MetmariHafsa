import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';
import { UserType } from '../models/User';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent],
  template: `
    <!-- Auth Pages (no sidebar/header) -->
    <div *ngIf="isAuthPage()" class="auth-layout">
      <router-outlet></router-outlet>
    </div>

    <!-- Main App Layout (with sidebar) -->
    <div *ngIf="!isAuthPage()" class="app-layout">
      <app-sidebar [cartCount]="cartService.getCartItems().length"></app-sidebar>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    /* Auth Layout */
    .auth-layout {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f5f7fa;
      padding: 2rem;
    }

    /* Main App Layout */
    .app-layout {
      display: flex;
      min-height: 100vh;
    }

    .main-content {
      flex: 1;
      padding: 2rem;
      margin-left: 250px;
      background: #f5f7fa;
      min-height: calc(100vh - 4rem);
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
      .auth-layout {
        padding: 1rem;
      }
      
      .main-content {
        margin-left: 0;
        padding: 1rem;
      }
    }
  `]
})
export class AppComponent {
  UserType = UserType;  // Required for template binding

  constructor(
    public cartService: CartService,
    public authService: AuthService,
    private router: Router
  ) {}

  isAuthPage(): boolean {
    return this.router.url.includes('/login') || 
           this.router.url.includes('/signup');
  }
}