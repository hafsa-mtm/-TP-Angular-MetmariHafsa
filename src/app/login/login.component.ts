import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User, UserType } from '../../models/User';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  login(): void {
    // Get users from localStorage (assuming users are saved with email and password)
    const usersData = localStorage.getItem('users');
    if (!usersData) {
      this.errorMessage = 'No registered users found. Please sign up first.';
      return;
    }

    const users = JSON.parse(usersData) as Array<any>;
    // Find user with matching email
    const userData = users.find(u => u.email === this.email);

    if (!userData) {
      this.errorMessage = 'User with this email does not exist.';
      return;
    }

    // Check password
    if (userData.password !== this.password) {
      this.errorMessage = 'Incorrect password.';
      return;
    }

    // Create User instance
    const user = new User(userData.userId, userData.firstName, userData.lastName, userData.age, userData.email);
    user.setUserType(userData.userType);

    // Save current user in localStorage (without password)
    localStorage.setItem('currentUser', JSON.stringify({
      userId: user.getUserId(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      age: user.getAge(),
      email: user.getEmail(),
      userType: user.getUserType()
    }));

    this.errorMessage = null;

    // Redirect after successful login
    this.router.navigate(['/']);
  }
}
