// order-confirmation.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../services/ordersService';
import { Order } from '../../models/order'; // Add this import

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent {
  order: any;
  orderNumber: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService
  ) {
    this.order = this.router.getCurrentNavigation()?.extras.state?.['order'];
    this.orderNumber = this.generateOrderNumber();
    
    if (this.order) {
      this.saveOrder();
    } else {
      this.router.navigate(['/']);
    }
  }

  private generateOrderNumber(): string {
    return 'ORD-' + Date.now().toString().slice(-8);
  }

  private saveOrder(): void {
    const newOrder: Order = {
      id: this.orderNumber,
      date: new Date().toISOString(),
      total: this.order.total,
      status: 'Processing',
      items: this.order.items.map((item: any) => ({
        name: item.productTitle,
        quantity: item.quantity,
        price: item.productPrice,
        imageUrl: item.imageUrl
      })),
      customer: {
        name: `${this.order.firstName} ${this.order.lastName}`,
        email: this.order.email
      },
      shippingAddress: {
        address: this.order.address,
        city: this.order.city,
        zipCode: this.order.zipCode,
        country: this.order.country
      }
    };
    
    this.ordersService.addOrder(newOrder);
  }
}