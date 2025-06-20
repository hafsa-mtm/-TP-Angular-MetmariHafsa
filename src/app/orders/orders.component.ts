import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { Order, OrderStatus } from '../../models/order';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private ordersService: OrdersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    try {
      const userEmail = this.authService.getCurrentUserEmail();
      console.log('Current user email:', userEmail);
      
      if (!userEmail) {
        throw new Error('User not authenticated');
      }
      
      this.orders = this.ordersService.getUserOrders();
      console.log('Retrieved orders:', this.orders);
      
    } catch (error) {
      console.error('Error loading orders:', error);
      this.errorMessage = 'Failed to load orders. Please try again later.';
      this.orders = [];
    } finally {
      this.isLoading = false;
    }
  }

  refreshOrders(): void {
    this.loadOrders();
  }

  getStatusClass(status: OrderStatus): string {
    return status.toLowerCase();
  }

  isDelivered(status: OrderStatus): boolean {
    return status === 'Delivered';
  }
}