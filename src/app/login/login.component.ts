import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User, UserType } from '../../models/User';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email = '';
  password = '';
  errorMessage: string | null = null;

 constructor(
    private authService: AuthService,
    private router: Router
  ) {}
// login.component.ts
login() {
  this.errorMessage = null;

  if (!this.email || !this.password) {
    this.errorMessage = 'Email and password are required';
    return;
  }

  if (this.authService.login(this.email, this.password)) {
    const user = this.authService.getCurrentUser();
    if (user?.getUserType() === UserType.Admin) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.router.navigate(['/']);
    }
  } else {
    this.errorMessage = 'Invalid email or password';
  }
}
}