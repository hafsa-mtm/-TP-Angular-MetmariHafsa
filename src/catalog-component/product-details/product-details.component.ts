import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../app/services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-details.component.html',
   styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  quantityToAdd: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (!productId) {
      console.error('Invalid product ID');
      return;
    }
    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
        // Reset quantity input on product load
        this.quantityToAdd = 1;
      },
      error: (err) => {
        console.error('Failed to load product details', err);
      }
    });
  }

  addToCart(): void {
    if (!this.product) return;

    if (this.quantityToAdd < 1) {
      alert('Please enter a valid quantity.');
      return;
    }

    if (this.quantityToAdd > (this.product.quantity || 0)) {
      alert('Quantity exceeds available stock.');
      return;
    }

    for (let i = 0; i < this.quantityToAdd; i++) {
      this.cartService.addToCart(this.product);
    }
    alert(`${this.quantityToAdd} "${this.product.productTitle}" added to cart!`);
    this.quantityToAdd = 1;  // reset quantity input after adding
  }
}
