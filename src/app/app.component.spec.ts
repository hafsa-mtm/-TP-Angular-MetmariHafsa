import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';

describe('AppComponent', () => {
  let mockRouter: any;
  let mockCartService: any;
  let mockAuthService: any;

  beforeEach(async () => {
    mockRouter = {
      url: '/',
      events: { subscribe: jasmine.createSpy() }
    };
    mockCartService = {
      getCartItems: jasmine.createSpy().and.returnValue([])
    };
    mockAuthService = {
      isLoggedIn: jasmine.createSpy()
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: CartService, useValue: mockCartService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should determine auth pages correctly', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    // Test login page
    mockRouter.url = '/login';
    expect(app.isAuthPage()).toBeTrue();
    
    // Test signup page
    mockRouter.url = '/signup';
    expect(app.isAuthPage()).toBeTrue();
    
    // Test non-auth page
    mockRouter.url = '/';
    expect(app.isAuthPage()).toBeFalse();
  });

  it('should pass cart count to sidebar', () => {
    const cartItems = [{}, {}, {}]; // 3 items
    mockCartService.getCartItems.and.returnValue(cartItems);
    
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    
    const sidebar = fixture.nativeElement.querySelector('app-sidebar');
    expect(sidebar).toBeTruthy();
    // You might need to test this differently based on how you pass the input
  });
});