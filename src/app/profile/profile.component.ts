// profile.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  };
  
  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  
  isEditing = false;

  constructor(public authService: AuthService) {
    if (authService.getCurrentUser()) {
      this.userData = {
        firstName: authService.getCurrentUser()?.getFirstName() || '',
        lastName: authService.getCurrentUser()?.getLastName() || '',
        email: authService.getCurrentUser()?.getEmail() || '',
        phone: '',
        address: ''
      };
    }
  }

  updateProfile(): void {
    // In a real app, you would call a service here
    alert('Profile updated successfully!');
    this.isEditing = false;
  }

  changePassword(): void {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    // In a real app, you would call a service here
    alert('Password changed successfully!');
    this.passwordData = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }
}