import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component } from '@angular/core';
import { Product } from './product.model';
import { HeaderService } from '../../template/header/header.service';

@Component({
  selector: 'app-product-creat',
  templateUrl: './product-creat.component.html',
  styleUrls: ['./product-creat.component.css']
})
export class ProductCreatComponent {
  product: Product = {
    name: '',
    price: 0
  }
  constructor(
        private productService: ProductService,
        private router: Router,
        private headerService: HeaderService) {
          headerService.headerData = {
            title: 'Incluir Novo Produto',
            icon: 'storefront',
            routeUrl: '/products'
      
          }
        }

  createProduct(): void {
    if (this.anyErrors()){
      return
    }

    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage("Produto Criado com sucesso!")
      this.router.navigate(['/products'])
    })
  }

  anyErrors(): boolean {
    if(this.product.name == "") {
      this.productService.showMessage("Não é possível criar um produto sem nome.")
      return true
    }
    
    if(this.product.price == 0) {
      this.productService.showMessage("Não é possível criar um produto sem preço.")
      return true
    }

    return false

  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
