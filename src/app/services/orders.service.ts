// orders.service.ts
import { Injectable } from '@angular/core';
import { Order, OrderStatus } from '../../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private orders: Order[] = [];

  constructor() {
    this.loadOrders();
  }

  private loadOrders(): void {
    const storedOrders = localStorage.getItem('watchStoreOrders');
    console.log('Raw localStorage data:', storedOrders);
      console.log('Loading orders from localStorage:', storedOrders);
     
  if (storedOrders) {
    try {
      this.orders = JSON.parse(storedOrders);
      console.log('Parsed orders:', this.orders); // Add this line
    } catch (e) {
      console.error('Error parsing orders:', e);
    }
  }
  }

  private saveOrders(): void {
      console.log('Saving orders:', this.orders);
    localStorage.setItem('watchStoreOrders', JSON.stringify(this.orders));
  }

  getOrders(): Order[] {
    return this.orders;
  }

  addOrder(order: Order): void {
    this.orders.push(order);
    this.saveOrders();
  }

getAllOrders(): Order[] {
  this.loadOrders(); 
  console.log('Current orders:', this.orders);
  return this.orders;
}

  // Change parameter type to OrderStatus
  getOrdersByStatus(status: OrderStatus): Order[] {
    return this.orders.filter(order => order.status === status);
  }

  // Change newStatus parameter type to OrderStatus
  updateOrderStatus(orderId: string, newStatus: OrderStatus): boolean {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      this.saveOrders();
      return true;
    }
    return false;
  }

  getUserOrders(userEmail: string): Order[] {
    return this.orders.filter(order => order.customer.email === userEmail);
  }
}