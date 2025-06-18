// checkout.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      paymentMethod: ['credit_card', Validators.required],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  get cartItems() {
    return this.cartService.getCartItems();
  }

  get total() {
    return this.cartService.getTotal();
  }

  submitOrder(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    
    // In a real app, you would send this to your backend
    const orderData = {
      ...this.checkoutForm.value,
      items: this.cartItems,
      total: this.total,
      orderDate: new Date().toISOString()
    };

    console.log('Submitting order:', orderData); // For debugging
    
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.cartService.clearCart();
      this.router.navigate(['/order-confirmation'], {
        state: { order: orderData }
      });
    }, 1500);
  }
}