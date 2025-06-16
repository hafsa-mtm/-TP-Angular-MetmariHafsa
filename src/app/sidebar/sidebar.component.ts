// sidebar.component.ts
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
  
  // Admin links data
  adminLinks = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/admin/products', icon: '📦', label: 'Products' },
    { path: '/admin/orders', icon: '📋', label: 'Orders' },
    { path: '/admin/users', icon: '👥', label: 'Users' },
    { path: '/admin/profile', icon: '⚙️', label: 'Admin Profile' }
  ];

  // Regular user links data
  userLinks = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/profile', icon: '👤', label: 'Profile' },
    { path: '/orders', icon: '📋', label: 'Orders' }
  ];

  constructor(public authService: AuthService) {}

  isAdminRoute(): boolean {
    return this.authService.getCurrentUser()?.getUserType() === UserType.Admin && 
           window.location.pathname.startsWith('/admin');
  }
}