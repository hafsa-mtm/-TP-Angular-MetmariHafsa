// admin-users.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User, UserType } from '../../../models/User';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  UserType = UserType; 
  filteredUsers: User[] = [];
  searchQuery: string = '';
  
  newUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: UserType.Member
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    const storedUsers = this.authService.getStoredUsers();
    this.users = storedUsers.map((userData: any) => 
      this.authService.getUserById(userData.userId) || 
      new User(
        userData.userId,
        userData.firstName,
        userData.lastName,
        userData.age || 0,
        userData.email,
        '',
        userData.userType
      )
    );
    this.filteredUsers = [...this.users];
  }

  addUser(): void {
    if (!this.validateUser()) return;

    const success = this.authService.register({
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      email: this.newUser.email,
      password: this.newUser.password
    }, this.newUser.userType === UserType.Admin);

    if (success) {
      this.loadUsers();
      this.resetForm();
    }
  }

  updateUserType(user: User, newType: UserType): void {
    const users = this.authService.getStoredUsers();
    const index = users.findIndex(u => u.userId === user.getUserId());
    
    if (index !== -1) {
      users[index].userType = newType;
      this.authService.saveUsers(users);
      user.setUserType(newType); // Update the local instance
    }
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      const users = this.authService.getStoredUsers();
      const updatedUsers = users.filter(u => u.userId !== userId);
      this.authService.saveUsers(updatedUsers);
      this.loadUsers();
    }
  }

  private validateUser(): boolean {
    if (!this.newUser.firstName || !this.newUser.lastName) {
      alert('Please enter both first and last name');
      return false;
    }
    if (!this.newUser.email.includes('@')) {
      alert('Please enter a valid email');
      return false;
    }
    if (this.newUser.password.length < 6) {
      alert('Password must be at least 6 characters');
      return false;
    }
    return true;
  }

  private resetForm(): void {
    this.newUser = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userType: UserType.Member
    };
  }

  onSearchChange(): void {
    if (!this.searchQuery) {
      this.filteredUsers = [...this.users];
      return;
    }
    
    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(user => 
      user.getFirstName().toLowerCase().includes(query) ||
      user.getLastName().toLowerCase().includes(query) ||
      user.getEmail().toLowerCase().includes(query)
    );
  }
}