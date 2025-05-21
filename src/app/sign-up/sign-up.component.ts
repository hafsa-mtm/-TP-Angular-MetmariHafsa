import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  firstName = '';
  lastName = '';
  age: number | null = null;
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private router: Router) {}

  register() {
    this.errorMessage = '';

    if (!this.email) {
      this.errorMessage = 'Email is required!';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    // You can add more validations here (email format, password strength, etc.)

    // Save user data to localStorage (just as example)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((u: any) => u.email === this.email);

    if (userExists) {
      this.errorMessage = 'Email already registered!';
      return;
    }

    users.push({
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
      email: this.email,
      password: this.password
    });

    localStorage.setItem('users', JSON.stringify(users));

    alert('User registered successfully!');

    // Redirect to login page after successful registration
    this.router.navigate(['/login']);
  }
}
