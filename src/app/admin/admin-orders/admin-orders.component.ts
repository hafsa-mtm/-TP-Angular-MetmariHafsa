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

  constructor(
    private ordersService: OrdersService,
    private authService: AuthService
  ) {}
ngOnInit(): void {
  this.loadOrders();
  
  // TEMPORARY: Add test data if no orders exist
  if (this.orders.length === 0) {
    console.warn('No orders found - injecting test data');
    const testOrder: Order = {
      id: 'TEST-' + Date.now(),
      date: new Date().toISOString(),
      total: 99.99,
      status: 'Processing',
      items: [{
        productId: 1,
        name: 'Test Watch',
        quantity: 1,
        price: 99.99,
        status: 'Processing',
        imageUrl: '/assets/test-watch.jpg'
      }],
      customer: {
        name: 'Test User',
        email: 'test@example.com'
      },
      shippingAddress: {
        address: '123 Test St',
        city: 'Testville',
        zipCode: '12345',
        country: 'Testland'
      }
    };
    this.ordersService.addOrder(testOrder);
    this.loadOrders(); // Reload
  }
}
 private loadOrders(): void {
  console.log('Before loading orders');
  this.orders = this.ordersService.getAllOrders();
  console.log('Orders after getAllOrders:', this.orders);
  this.filteredOrders = [...this.orders];
  console.log('Filtered orders:', this.filteredOrders);
  this.applyFilters();
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
    if (this.ordersService.updateOrderStatus(order.id, newStatus)) {
      order.status = newStatus;
    }
  }

  onStatusChange(order: Order, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value as OrderStatus;
    this.updateOrderStatus(order, newStatus);
  }

  getStatusClass(status: OrderStatus): string {
    switch(status) {
      case 'Processing': return 'status-processing';
      case 'Shipped': return 'status-shipped';
      case 'Delivered': return 'status-delivered';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  }
}