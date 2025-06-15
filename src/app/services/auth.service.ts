// auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { User, UserType } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;
  private readonly isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    if (!this.isBrowser) return;

    const userData = localStorage.getItem('currentUser');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        this.currentUser = new User(
          parsedData.userId,
          parsedData.firstName,
          parsedData.lastName,
          parsedData.age,
          parsedData.email,
          '', // Password not stored in currentUser for security
          parsedData.userType
        );
      } catch (e) {
        console.error('Failed to parse current user data', e);
        this.clearCurrentUser();
      }
    }
  }

  register(userData: any): boolean {
    if (!this.isBrowser) return false;

    const users = this.getStoredUsers();
    
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
    this.saveUsers(users);
    this.setCurrentUser(newUser);
    return true;
  }

  login(email: string, password: string): boolean {
    if (!this.isBrowser) return false;

    const users = this.getStoredUsers();
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
    this.currentUser = user;
    if (this.isBrowser) {
      localStorage.setItem('currentUser', JSON.stringify({
        userId: user.getUserId(),
        firstName: user.getFirstName(),
        lastName: user.getLastName(),
        age: user.getAge(),
        email: user.getEmail(),
        userType: user.getUserType()
      }));
    }
  }

  logout(): void {
    this.clearCurrentUser();
    this.router.navigate(['/login']);
  }

  private clearCurrentUser(): void {
    this.currentUser = null;
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
    }
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getCurrentUserEmail(): string | null {
    return this.currentUser?.getEmail() || null;
  }

  private getStoredUsers(): any[] {
    if (!this.isBrowser) return [];

    try {
      return JSON.parse(localStorage.getItem('users') || '[]');
    } catch (e) {
      console.error('Failed to parse users data', e);
      return [];
    }
  }

  private saveUsers(users: any[]): void {
    if (this.isBrowser) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }
}