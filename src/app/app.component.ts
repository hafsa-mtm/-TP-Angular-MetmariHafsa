import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CatalogComponentComponent } from "../catalog-component/catalog-component.component";
import { Product } from '../models/Product';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CatalogComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp4';
  selectedProduct: Product | null = null;
  onProductSelected(product: Product) {
    if (this.selectedProduct === product)
      this.selectedProduct = null; // Toggle: cacher si déjà sélectionné
    else
    this.selectedProduct = product; // Afficher si différent
  }
}
