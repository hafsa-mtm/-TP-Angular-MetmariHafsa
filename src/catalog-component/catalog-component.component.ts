import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service'; // adjust path
import { Product } from '../models/Product'; // adjust path
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
  products: Product[] = [];
  isLoading = false;
  error: string | null = null;

  // Add these for filtering
  categories: string[] = ['All', 'Screens', 'Laptops', 'Mouse', 'Tablettes'];
  selectedCategory: string = 'All';
  filteredProducts: Product[] = [];

  constructor(private cartService: CartService, private productService: ProductService, private router: Router) {}
   addToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert(`${product.productTitle} added to cart!`); // Temporary feedback
  }
  ngOnInit(): void {
    this.loadProducts();
  }

  get availableProducts(): Product[] {
    // You can now return filteredProducts filtered by quantity
    return this.filteredProducts.filter(p => p.quantity > 0);
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
        this.applyFilter();  // apply filter after loading
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products.';
        this.isLoading = false;
      }
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.selectedCategory === 'All') {
      this.filteredProducts = this.products;
    } else {
      // You’ll need to filter by category — but your Product model currently lacks a 'category' property!
      // Assuming you add 'category' to Product, filter like this:
      this.filteredProducts = this.products.filter(
        p => p.category && p.category.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }
  }
}

