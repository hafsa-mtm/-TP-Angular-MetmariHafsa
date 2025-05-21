import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User, UserType } from '../../models/User';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule , CommonModule ,  RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  firstName = '';
  lastName = '';
  age: number = 0;
  password = '';
  greeting: string | null = null;
  currentUser: User | null = null;

  constructor(private router: Router) {}

  login(): void {
    const user = new User(Date.now(), this.firstName, this.lastName, this.age);

    if (this.password === 'admin') {
      user.setUserType(UserType.Admin);
    } else {
      user.setUserType(UserType.Member);
    }

    this.currentUser = user;
    this.greeting = user.greetUser();

    localStorage.setItem('currentUser', JSON.stringify({
      id: user.getUserId(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      age: user.getAge(),
      userType: user.getUserType()
    }));

    // Redirect to catalog page after login
    this.router.navigate(['/']);
  }
}
