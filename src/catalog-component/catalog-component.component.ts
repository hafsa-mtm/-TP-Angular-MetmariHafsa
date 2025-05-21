import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service'; // adjust path
import { Product } from '../models/Product'; // adjust path
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog-component',
  templateUrl: './catalog-component.component.html',
  styleUrls: ['./catalog-component.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CatalogComponentComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  get availableProducts(): Product[] {
    return this.products.filter(p => p.quantity > 0);
  }

  selectProduct(product: Product): void {
    this.router.navigate(['/product', product.productId]);
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = null;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products.';
        this.isLoading = false;
      }
    });
  }
}
