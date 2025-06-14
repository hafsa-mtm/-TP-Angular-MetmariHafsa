import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


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

 constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  // sign-up.component.ts
 register() {
    this.errorMessage = '';

    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Email and password are required!';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }  const success = this.authService.register({
    firstName: this.firstName,
    lastName: this.lastName,
    age: this.age,
    email: this.email,
    password: this.password
  });
if (success) {
    this.router.navigate(['/login']); 
  } else {
    this.errorMessage = 'Email already registered!';
  }
}
}