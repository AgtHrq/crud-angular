import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from './product.model';

@Component({
  selector: 'app-product-creat',
  templateUrl: './product-creat.component.html',
  styleUrls: ['./product-creat.component.css']
})
export class ProductCreatComponent {
  product: Product = {
    name: 'Notebook',
    price: 4000
  }
  constructor(private productService: ProductService, private router: Router) {}

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado com sucesso!');
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
