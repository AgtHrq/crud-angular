import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component } from '@angular/core';
import { Product } from './product.model';

@Component({
  selector: 'app-product-creat',
  templateUrl: './product-creat.component.html',
  styleUrls: ['./product-creat.component.css']
})
export class ProductCreatComponent {
  product: Product = {
    name: 'Gadjonhas 2.0',
    price: 125.5
  }
  constructor(private productService: ProductService, private router: Router) { }

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage("Produto Criado com sucesso!")
      this.product.name = ''
      this.product.price = 0
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
