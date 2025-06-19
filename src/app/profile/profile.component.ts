// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
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
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.userData = {
        firstName: this.currentUser.getFirstName(),
        lastName: this.currentUser.getLastName(),
        email: this.currentUser.getEmail(),
        phone: '', // Add phone to your User model if needed
        address: '' // Add address to your User model if needed
      };
    }
  }

  updateProfile(): void {
    if (!this.currentUser) return;

    // Update local user data
    this.currentUser.setFirstName(this.userData.firstName);
    this.currentUser.setLastName(this.userData.lastName);
    // Note: Email shouldn't be changed directly as it's often used as identifier

    // Update in localStorage
    this.authService.setCurrentUser(this.currentUser);

    // Update in users list
    const users = this.authService.getStoredUsers();
    const userIndex = users.findIndex(u => u.userId === this.currentUser?.getUserId());
    
    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        firstName: this.userData.firstName,
        lastName: this.userData.lastName,
        // Add phone and address if you've added them to your User model
      };
      this.authService.saveUsers(users);
    }

    this.successMessage = 'Profile updated successfully!';
    this.isEditing = false;
    setTimeout(() => this.successMessage = '', 3000);
  }

  changePassword(): void {
    if (!this.currentUser) return;

    // Validate
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      this.errorMessage = 'New passwords do not match!';
      setTimeout(() => this.errorMessage = '', 3000);
      return;
    }

    if (this.passwordData.newPassword.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      setTimeout(() => this.errorMessage = '', 3000);
      return;
    }

    // Verify current password
    const users = this.authService.getStoredUsers();
    const userData = users.find(u => u.userId === this.currentUser?.getUserId());

    if (!userData || userData.password !== this.passwordData.currentPassword) {
      this.errorMessage = 'Current password is incorrect';
      setTimeout(() => this.errorMessage = '', 3000);
      return;
    }

    // Update password
    userData.password = this.passwordData.newPassword;
    this.currentUser.setPassword(this.passwordData.newPassword);
    this.authService.saveUsers(users);
    this.authService.setCurrentUser(this.currentUser);

    // Reset form
    this.passwordData = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };

    this.successMessage = 'Password changed successfully!';
    setTimeout(() => this.successMessage = '', 3000);
  }
}