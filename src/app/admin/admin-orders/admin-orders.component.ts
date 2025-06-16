// admin-orders.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  userId: number;
  userName: string;
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders: Order[] = [
    {
      id: 1,
      userId: 2,
      userName: 'John Doe',
      items: [
        { productId: 1, name: 'Laptop', quantity: 1, price: 999.99 },
        { productId: 2, name: 'Smartphone', quantity: 2, price: 699.99 }
      ],
      total: 2399.97,
      status: 'Processing',
      createdAt: new Date('2023-05-10'),
      updatedAt: new Date('2023-05-10')
    },
    {
      id: 2,
      userId: 3,
      userName: 'Jane Smith',
      items: [
        { productId: 2, name: 'Smartphone', quantity: 1, price: 699.99 }
      ],
      total: 699.99,
      status: 'Shipped',
      createdAt: new Date('2023-05-12'),
      updatedAt: new Date('2023-05-13')
    }
  ];

  statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  updateOrderStatus(order: Order, newStatus: string) {
    order.status = newStatus as any;
    order.updatedAt = new Date();
    // In a real app, you would call a service here
  }
  onStatusChange(order: Order, event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  const newStatus = selectElement.value;
  this.updateOrderStatus(order, newStatus);
}
}