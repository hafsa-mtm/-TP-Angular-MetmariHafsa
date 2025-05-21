import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule , CommonModule ,RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  firstName = '';
  lastName = '';
  age: number | null = null;
  password = '';
  confirmPassword = '';
  errorMessage = '';

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    // Do registration logic here (e.g., call API, save user, etc.)
    // For now, just clear form or redirect after success.
    alert('User registered successfully!');
  }
}

