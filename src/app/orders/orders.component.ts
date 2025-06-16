// orders.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Order {
  id: number;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders: Order[] = [
    {
      id: 1001,
      date: '2023-05-15',
      total: 125.99,
      status: 'Delivered',
      items: [
        { name: 'Wireless Earbuds', quantity: 1, price: 79.99 },
        { name: 'Phone Case', quantity: 2, price: 23.00 }
      ]
    },
    {
      id: 1002,
      date: '2023-06-20',
      total: 89.50,
      status: 'Shipped',
      items: [
        { name: 'Smart Watch', quantity: 1, price: 89.50 }
      ]
    }
  ];

  getStatusClass(status: string): string {
    switch(status) {
      case 'Processing': return 'status-processing';
      case 'Shipped': return 'status-shipped';
      case 'Delivered': return 'status-delivered';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  }
}