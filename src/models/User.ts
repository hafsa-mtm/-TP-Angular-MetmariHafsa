export enum UserType {
  Admin = "Admin",
  Member = "Member",
  Guest = "Guest"
}

export class User {
  private userId: number;
  private firstName: string;
  private lastName: string;
  private age: number;
  private email: string;
  private userType: UserType;

  constructor(userId: number, firstName: string, lastName: string, age: number, email: string) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
    this.userType = UserType.Member; // Default user type
  }

  fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  greetUser(): string {
    switch (this.userType) {
      case UserType.Admin:
        return `Welcome Admin ${this.fullName()}, you have full access.`;
      case UserType.Member:
        return `Welcome Member ${this.fullName()}, enjoy your shopping.`;
      default:
        return `Welcome Guest, feel free to explore.`;
    }
  }

  getUserId(): number {
    return this.userId;
  }

  setUserId(userId: number): void {
    this.userId = userId;
  }

  getFirstName(): string {
    return this.firstName;
  }

  setFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  setLastName(lastName: string): void {
    this.lastName = lastName;
  }

  getAge(): number {
    return this.age;
  }

  setAge(age: number): void {
    this.age = age;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  getUserType(): UserType {
    return this.userType;
  }

  setUserType(userType: UserType): void {
    this.userType = userType;
  }
}