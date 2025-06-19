// admin-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  currentUser: User | null = null;
  profile = {
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.profile = {
        firstName: this.currentUser.getFirstName(),
        lastName: this.currentUser.getLastName(),
        email: this.currentUser.getEmail(),
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      };
    }
  }

  updateProfile() {
    if (!this.currentUser) return;

    // Update local user data
    this.currentUser.setFirstName(this.profile.firstName);
    this.currentUser.setLastName(this.profile.lastName);
    this.currentUser.setEmail(this.profile.email);

    // Update in localStorage
    this.authService.setCurrentUser(this.currentUser);

    // Update in users list
    const users = this.authService.getStoredUsers();
    const userIndex = users.findIndex(u => u.userId === this.currentUser?.getUserId());
    
    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        firstName: this.profile.firstName,
        lastName: this.profile.lastName,
        email: this.profile.email
      };
      this.authService.saveUsers(users);
    }

    this.successMessage = 'Profile updated successfully!';
    setTimeout(() => this.successMessage = '', 3000);
  }

  changePassword() {
    if (!this.currentUser) return;

    // Validate
    if (this.profile.newPassword !== this.profile.confirmPassword) {
      this.errorMessage = 'New passwords do not match!';
      setTimeout(() => this.errorMessage = '', 3000);
      return;
    }

    if (this.profile.newPassword.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      setTimeout(() => this.errorMessage = '', 3000);
      return;
    }

    // Verify current password
    const users = this.authService.getStoredUsers();
    const userData = users.find(u => u.userId === this.currentUser?.getUserId());

    if (!userData || userData.password !== this.profile.currentPassword) {
      this.errorMessage = 'Current password is incorrect';
      setTimeout(() => this.errorMessage = '', 3000);
      return;
    }

    // Update password
    userData.password = this.profile.newPassword;
    this.currentUser.setPassword(this.profile.newPassword);
    this.authService.saveUsers(users);
    this.authService.setCurrentUser(this.currentUser);

    // Reset form
    this.profile.currentPassword = '';
    this.profile.newPassword = '';
    this.profile.confirmPassword = '';

    this.successMessage = 'Password changed successfully!';
    setTimeout(() => this.successMessage = '', 3000);
  }
}