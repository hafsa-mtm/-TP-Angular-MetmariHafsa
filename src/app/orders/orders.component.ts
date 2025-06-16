import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  dummyOrders = [
    { id: 1001, date: '2023-05-15', total: 125.99, status: 'Delivered' },
    { id: 1002, date: '2023-06-20', total: 89.50, status: 'Shipped' }
  ];
}