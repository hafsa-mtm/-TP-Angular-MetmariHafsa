import { Component } from '@angular/core';
import { Product } from '../models/Product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ProductDetailsComponent } from '../product-details/product-details.component';
@Component({
  selector: 'app-catalog-component',
  imports: [FormsModule, CommonModule, ProductDetailsComponent],
  templateUrl: './catalog-component.component.html',
  styleUrls: ['./catalog-component.component.css']
})
export class CatalogComponentComponent {
  @Input() selectedProduct: Product | null = null;
  @Output() productSelected = new EventEmitter<Product>();
  products: Product[] = [
    new Product(1, 'Laptop', 1200, 5, 'High-end gaming laptop', 'assets/images/laptop.jpg'),
    new Product(2, 'Mouse', 20, 25, 'Wireless mouse', 'assets/images/mouse.jpg'),
    new Product(3, 'Tablette', 300, 2, '27 inch 4K monitor', 'assets/images/tablette.jpg')
  ];

  get availableProducts(): Product[] {
    return this.products.filter(p => p.quantity > 0);
  }
  
  selectProduct(product: Product) {
    this.productSelected.emit(product);}
    
}
