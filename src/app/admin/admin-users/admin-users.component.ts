import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {
  dummyUsers = [
    { id: 1, name: 'Admin User', email: 'admin@admin.com', type: 'Admin' },
    { id: 2, name: 'John Doe', email: 'john@example.com', type: 'Member' }
  ];

  constructor(private authService: AuthService) {}

  promoteUser(userId: number) {
    console.log(`Promoting user ${userId} to admin`);
    // Implementation would go here
  }
}