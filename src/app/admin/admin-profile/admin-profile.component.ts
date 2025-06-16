// admin-profile.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent {
  profile = {
    name: 'Admin User',
    email: 'admin@admin.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private authService: AuthService) {}

  updateProfile() {
    // In a real app, you would call a service here
    console.log('Profile updated:', this.profile);
    alert('Profile updated successfully!');
  }

  changePassword() {
    if (this.profile.newPassword !== this.profile.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    // In a real app, you would call a service here
    console.log('Password changed');
    alert('Password changed successfully!');
    this.profile.currentPassword = '';
    this.profile.newPassword = '';
    this.profile.confirmPassword = '';
  }
}