import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserType } from '../../models/User';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() cartCount = 0;
  UserType = UserType;
  
  // Admin links
  adminLinks = [
    { path: '/admin/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/admin/products', icon: 'inventory_2', label: 'Products' },
    { path: '/admin/orders', icon: 'receipt_long', label: 'Orders' },
    { path: '/admin/users', icon: 'people', label: 'Users' },
    { path: '/admin/profile', icon: 'settings', label: 'Profile' }
  ];

  // Regular user links
  userLinks = [
    { path: '/', icon: 'home', label: 'Home' },
    { path: '/cart', icon: 'shopping_cart', label: 'Cart' },
    { path: '/orders', icon: 'receipt', label: 'Orders' },
    { path: '/profile', icon: 'person', label: 'Profile' }
  ];

  constructor(public authService: AuthService) {}

  isAdminRoute(): boolean {
    const user = this.authService.getCurrentUser();
    return user?.getUserType() === UserType.Admin && 
           window.location.pathname.startsWith('/admin');
  }
}