import { Routes } from '@angular/router';
import { CatalogComponentComponent } from '../catalog-component/catalog-component.component';
import { ProductDetailsComponent } from '../catalog-component/product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  { 
    path: 'signup', 
    component: SignUpComponent,
    title: 'Sign Up'  // Added title for better SEO
  },
  { 
    path: 'login', 
    component: LoginComponent,
    title: 'Login'    // Added title for better SEO
  },
  { 
    path: '', 
    component: CatalogComponentComponent,
    title: 'Product Catalog'  // Added title
  },
  { 
    path: 'product/:id', 
    component: ProductDetailsComponent,
    title: 'Product Details'  // Added title
  },
  { 
    path: 'cart', 
    component: CartComponent,
    title: 'Your Shopping Cart'
  },
   { 
    path: '**', 
    redirectTo: ''  // Wildcard route redirects to catalog
  }
];