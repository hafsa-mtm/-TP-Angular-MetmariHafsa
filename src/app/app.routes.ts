import { Routes } from '@angular/router';
import { CatalogComponentComponent } from '../catalog-component/catalog-component.component';
import { ProductDetailsComponent } from '../catalog-component/product-details/product-details.component';

export const routes: Routes = [
  { path: '', component: CatalogComponentComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: '**', redirectTo: '' }  // fallback route
];
