// services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserType } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  register(userData: any): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some((u: any) => u.email === userData.email)) {
      return false;
    }

    const newUser = new User(
      Date.now(),
      userData.firstName,
      userData.lastName,
      userData.age,
      userData.email,
      userData.password,
      UserType.Member
    );

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    this.setCurrentUser(newUser);
    return true;
  }

  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userData = users.find((u: any) => u.email === email && u.password === password);

    if (userData) {
      const user = new User(
        userData.userId,
        userData.firstName,
        userData.lastName,
        userData.age,
        userData.email,
        userData.password,
        userData.userType
      );
      this.setCurrentUser(user);
      return true;
    }
    return false;
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify({
      userId: user.getUserId(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      age: user.getAge(),
      email: user.getEmail(),
      userType: user.getUserType()
    }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser(): User | null {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }
}