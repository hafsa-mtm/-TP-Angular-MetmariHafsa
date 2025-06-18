// catalog-component.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product';
import { CommonModule } from '@angular/common';
import { CartService } from '../app/services/cart.service';

@Component({
  selector: 'app-catalog-component',
  templateUrl: './catalog-component.component.html',
  styleUrls: ['./catalog-component.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CatalogComponentComponent implements OnInit {
  isLoading = false;
  error: string | null = null;
  categories: string[] = ['All', 'Screens', 'Laptops', 'Mouse', 'Tablettes'];
  selectedCategory: string = 'All';
  filteredProducts: Product[] = [];

  constructor(
    private cartService: CartService, 
    private productService: ProductService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  get availableProducts(): Product[] {
    return this.filteredProducts.filter(p => p.quantity > 0);
  }

  addToCart(product: Product): void {
    if (product.quantity > 0) {
      this.cartService.addToCart(product);
      alert(`${product.productTitle} added to cart!`);
    } else {
      alert('This product is out of stock!');
    }
  }

  selectProduct(product: Product): void {
    this.router.navigate(['/product', product.productId]);
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = null;
    this.productService.products$.subscribe({
      next: (products) => {
        this.filteredProducts = products;
        this.applyFilter();
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products.';
        this.isLoading = false;
      }
    });
    this.productService.loadProducts();
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilter();
  }

  applyFilter(): void {
    const products = this.filteredProducts;
    if (this.selectedCategory === 'All') {
      this.filteredProducts = [...products];
    } else {
      this.filteredProducts = products.filter(
        p => p.category && p.category.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }
  }
}