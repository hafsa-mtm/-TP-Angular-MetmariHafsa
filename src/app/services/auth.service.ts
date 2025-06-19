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

  register(userData: any, isAdmin: boolean = false): boolean {
    if (!this.isBrowser) return false;

    const users = this.getStoredUsers();
    
    if (users.some((u: any) => u.email === userData.email)) {
      return false;
    }

    const newUser = new User(
      Date.now(),
      userData.firstName,
      userData.lastName,
      userData.age || 0,
      userData.email,
      userData.password,
      isAdmin ? UserType.Admin : UserType.Member
    );

    users.push({
      userId: newUser.getUserId(),
      firstName: newUser.getFirstName(),
      lastName: newUser.getLastName(),
      age: newUser.getAge(),
      email: newUser.getEmail(),
      password: newUser.getPassword(),
      userType: newUser.getUserType()
    });
    
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

  public setCurrentUser(user: User): void {
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

  // Changed from private to public to allow admin user management
  public getStoredUsers(): any[] {
    if (!this.isBrowser) return [];

    try {
      return JSON.parse(localStorage.getItem('users') || '[]');
    } catch (e) {
      console.error('Failed to parse users data', e);
      return [];
    }
  }

  // Changed from private to public to allow admin user management
  public saveUsers(users: any[]): void {
    if (this.isBrowser) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  // New public method to get user by ID
  public getUserById(userId: number): User | null {
    const userData = this.getStoredUsers().find(u => u.userId === userId);
    if (!userData) return null;
    
    return new User(
      userData.userId,
      userData.firstName,
      userData.lastName,
      userData.age,
      userData.email,
      '', // Don't expose password
      userData.userType
    );
  }

  // New public method to check if current user is admin
  public isAdmin(): boolean {
    return this.currentUser?.getUserType() === UserType.Admin;
  }
}