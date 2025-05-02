import { Component } from '@angular/core';
import { CatalogComponentComponent } from "../catalog-component/catalog-component.component";
import { Product } from '../models/Product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CatalogComponentComponent], // Removed RouterOutlet
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp4';
  selectedProduct: Product | null = null;

  onProductSelected(product: Product | null) {
    this.selectedProduct = product;
  }
}