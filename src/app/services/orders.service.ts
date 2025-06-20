import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from './auth.service';
import { isPlatformBrowser } from '@angular/common';
import { Order, OrderStatus } from '../../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private orders: Order[] = [];
  private readonly isBrowser: boolean;
  private ordersLoaded = false;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private authService: AuthService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadOrders();
  }

  // Get all orders (for admin)
  getAllOrders(): Order[] {
    this.ensureOrdersLoaded();
    return [...this.orders];
  }

  // Get orders for current user only
  getUserOrders(): Order[] {
    this.ensureOrdersLoaded();
    
    if (!this.isBrowser) return [];
    
    const userEmail = this.authService.getCurrentUserEmail()?.trim().toLowerCase();
    console.log('Filtering orders for user:', userEmail);
    
    if (!userEmail) {
      console.warn('No user email found - not logged in?');
      return [];
    }
    
    const filtered = this.orders.filter(order => {
      const orderEmail = order.customer?.email?.trim().toLowerCase();
      const match = orderEmail === userEmail;
      console.log(`Order ${order.id} - Customer: ${orderEmail} - Match: ${match}`);
      return match;
    });
    
    console.log('Filtered orders:', filtered);
    return filtered;
  }

  addOrder(order: Order): void {
    if (!this.isBrowser) return;
    
    this.orders.unshift(order);
    this.saveOrders();
  }

  updateOrderStatus(orderId: string, newStatus: OrderStatus): boolean {
    if (!this.isBrowser) return false;
    
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      this.saveOrders();
      return true;
    }
    return false;
  }

  private ensureOrdersLoaded(): void {
    if (!this.ordersLoaded && this.isBrowser) {
      this.loadOrders();
      this.ordersLoaded = true;
    }
  }

  private loadOrders(): void {
    if (!this.isBrowser) return;
    
    try {
      const savedOrders = localStorage.getItem('orders');
      this.orders = savedOrders ? JSON.parse(savedOrders) : [];
    } catch (error) {
      console.error('Error loading orders:', error);
      this.orders = [];
    }
  }

  private saveOrders(): void {
    if (!this.isBrowser) return;
    
    try {
      localStorage.setItem('orders', JSON.stringify(this.orders));
    } catch (error) {
      console.error('Error saving orders:', error);
    }
  }
}