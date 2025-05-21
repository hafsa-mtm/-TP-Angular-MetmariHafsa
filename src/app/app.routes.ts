import { Routes } from '@angular/router';
import { CatalogComponentComponent } from '../catalog-component/catalog-component.component';
import { ProductDetailsComponent } from '../catalog-component/product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

  export const routes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: CatalogComponentComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: '**', redirectTo: '' }
];

