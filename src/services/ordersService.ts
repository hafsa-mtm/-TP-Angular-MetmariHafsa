// orders.service.ts
import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private orders: Order[] = [];

  constructor() {
    this.loadOrders();
  }

  getOrders(): Order[] {
    return [...this.orders]; // Return a copy
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find(order => order.id === id);
  }

  addOrder(order: Order): void {
    this.orders.unshift(order); // Newest first
    this.saveOrders();
  }

  updateOrderStatus(id: string, status: Order['status']): void {
    const order = this.getOrderById(id);
    if (order) {
      order.status = status;
      this.saveOrders();
    }
  }

  private loadOrders(): void {
    const savedOrders = localStorage.getItem('user_orders');
    this.orders = savedOrders ? JSON.parse(savedOrders) : [];
  }

  private saveOrders(): void {
    localStorage.setItem('user_orders', JSON.stringify(this.orders));
  }
}