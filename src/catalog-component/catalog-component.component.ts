import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/Product';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalog-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductDetailsComponent],
  templateUrl: './catalog-component.component.html',
  styleUrls: ['./catalog-component.component.css']
})
export class CatalogComponentComponent implements OnInit {
  @Input() selectedProduct: Product | null = null;
  @Output() productSelected = new EventEmitter<Product | null>();
  products: Product[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  get availableProducts(): Product[] {
    return this.products.filter(p => p.quantity > 0);
  }

  selectProduct(product: Product): void {
    this.selectedProduct = this.selectedProduct?.productId === product.productId 
      ? null 
      : product;
    this.productSelected.emit(this.selectedProduct);
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
        this.error = 'Failed to load products. Please try again later.';
        this.isLoading = false;
        console.error('Error loading products:', err);
      }
    });
  }
}