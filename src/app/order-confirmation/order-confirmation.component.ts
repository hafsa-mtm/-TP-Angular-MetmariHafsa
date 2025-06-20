// order-confirmation.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { Order } from '../../models/order';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent {
  order!: Order; 
  orderNumber!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService,
    private cartService: CartService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const orderData = navigation?.extras.state?.['order'];
    
    if (!orderData) {
      this.router.navigate(['/']);
      return;
    }

    this.orderNumber = this.generateOrderNumber();
    this.order = this.createOrder(orderData);
    this.saveOrder();
    this.cartService.clearCart();
  }

  private generateOrderNumber(): string {
    return 'ORD-' + Date.now().toString().slice(-8);
  }

  private createOrder(orderData: any): Order {
    return {
      id: this.orderNumber,
      date: new Date().toISOString(),
      total: orderData.total,
      status: 'Processing',
      items: orderData.items.map((item: any) => ({
        productId: item.productId,
        name: item.productTitle,
        quantity: item.quantity,
        price: item.productPrice,
        status: 'Processing',
        imageUrl: item.imageUrl
      })),
      customer: {
        name: `${orderData.firstName} ${orderData.lastName}`,
        email: orderData.email
      },
      shippingAddress: {
        address: orderData.address,
        city: orderData.city,
        zipCode: orderData.zipCode,
        country: orderData.country
      }
    };
  }

  private saveOrder(): void {
    this.ordersService.addOrder(this.order);
  }
}