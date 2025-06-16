import { Routes } from '@angular/router';
import { CatalogComponentComponent } from '../catalog-component/catalog-component.component';
import { ProductDetailsComponent } from '../catalog-component/product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CartComponent } from './cart/cart.component';
import { AdminGuard } from './guards/admin.guard';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';

export const routes: Routes = [
  { 
    path: 'signup', 
    component: SignUpComponent,
    title: 'Sign Up'
  },
  { 
    path: 'login', 
    component: LoginComponent,
    title: 'Login'
  },
  { 
    path: '', 
    component: CatalogComponentComponent,
    title: 'Product Catalog'
  },
  { 
    path: 'product/:id', 
    component: ProductDetailsComponent,
    title: 'Product Details'
  },
  { 
    path: 'cart', 
    component: CartComponent,
    title: 'Your Shopping Cart'
  },
  // User account routes
  { 
    path: 'profile', 
    component: ProfileComponent,
    title: 'My Profile'
  },
  { 
    path: 'orders', 
    component: OrdersComponent,
    title: 'My Orders'
  },
  // Admin routes
 {
  path: 'admin',
  canActivate: [AdminGuard],
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'products', component: AdminProductsComponent },
    { path: 'users', component: AdminUsersComponent },
    { path: 'orders', component: AdminOrdersComponent}, // Add this
    { path: 'profile', component: AdminProfileComponent }, // Add this
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ]

  },
  // Wildcard route (must be last)
  { 
    path: '**', 
    redirectTo: ''
  }
];