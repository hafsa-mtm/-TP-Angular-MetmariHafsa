// admin-orders.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrdersService } from '../../services/orders.service';
import { Order, OrderStatus } from '../../../models/order';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  statusOptions: OrderStatus[] = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];
  selectedStatus: string = 'all';
  searchQuery: string = '';
  isLoading = true;

  constructor(
    private ordersService: OrdersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders(): void {
    this.isLoading = true;
    try {
      this.orders = this.ordersService.getAllOrders();
      this.applyFilters();
    } catch (error) {
      console.error('Error loading orders:', error);
      this.orders = [];
      this.filteredOrders = [];
    } finally {
      this.isLoading = false;
    }
  }

  onStatusFilterChange(): void {
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredOrders = this.orders.filter(order => {
      const matchesStatus = this.selectedStatus === 'all' || order.status === this.selectedStatus;
      const matchesSearch = !this.searchQuery || 
        order.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      return matchesStatus && matchesSearch;
    });
  }

  updateOrderStatus(order: Order, newStatus: OrderStatus): void {
    const updated = this.ordersService.updateOrderStatus(order.id, newStatus);
    if (updated) {
      order.status = newStatus;
    }
  }

  onStatusChange(order: Order, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value as OrderStatus;
    this.updateOrderStatus(order, newStatus);
  }

  getStatusClass(status: OrderStatus): string {
    return status.toLowerCase();
  }
}