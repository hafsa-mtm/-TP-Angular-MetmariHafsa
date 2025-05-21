import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // <-- import RouterModule here

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],  // <-- add RouterModule here
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (err) => {
        console.error('Failed to load product details', err);
      }
    });
  }
}
