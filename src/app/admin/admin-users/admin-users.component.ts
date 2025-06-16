// admin-users.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

interface User {
  id: number;
  name: string;
  email: string;
  type: 'Admin' | 'Member';
  createdAt?: Date;
}

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {
  users: User[] = [
    { id: 1, name: 'Admin User', email: 'admin@admin.com', type: 'Admin', createdAt: new Date('2023-01-01') },
    { id: 2, name: 'John Doe', email: 'john@example.com', type: 'Member', createdAt: new Date('2023-02-15') }
  ];

  newUser: User = {
    id: 0,
    name: '',
    email: '',
    type: 'Member'
  };

  constructor(private authService: AuthService) {}

  addUser() {
    this.newUser.id = this.users.length > 0 
      ? Math.max(...this.users.map(u => u.id)) + 1 
      : 1;
    this.users.push({...this.newUser, createdAt: new Date()});
    this.resetForm();
  }

  promoteUser(user: User) {
    user.type = 'Admin';
    // In a real app, you would call a service here
  }

  demoteUser(user: User) {
    user.type = 'Member';
    // In a real app, you would call a service here
  }

  deleteUser(id: number) {
    this.users = this.users.filter(u => u.id !== id);
  }

  resetForm() {
    this.newUser = {
      id: 0,
      name: '',
      email: '',
      type: 'Member'
    };
  }
}