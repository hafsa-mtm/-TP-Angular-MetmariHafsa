// admin-products.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description?: string;
  category?: string;
}

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 999.99, stock: 15, description: 'High performance laptop', category: 'Electronics' },
    { id: 2, name: 'Smartphone', price: 699.99, stock: 30, description: 'Latest smartphone model', category: 'Electronics' }
  ];

  newProduct: Product = {
    id: 0,
    name: '',
    price: 0,
    stock: 0,
    description: '',
    category: ''
  };

  isEditing = false;
  currentProductId: number | null = null;

  addProduct() {
    this.newProduct.id = this.products.length > 0 
      ? Math.max(...this.products.map(p => p.id)) + 1 
      : 1;
    this.products.push({...this.newProduct});
    this.resetForm();
  }

  editProduct(product: Product) {
    this.isEditing = true;
    this.currentProductId = product.id;
    this.newProduct = {...product};
  }

  updateProduct() {
    const index = this.products.findIndex(p => p.id === this.currentProductId);
    if (index !== -1) {
      this.products[index] = {...this.newProduct};
    }
    this.resetForm();
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }

  resetForm() {
    this.newProduct = {
      id: 0,
      name: '',
      price: 0,
      stock: 0,
      description: '',
      category: ''
    };
    this.isEditing = false;
    this.currentProductId = null;
  }
}