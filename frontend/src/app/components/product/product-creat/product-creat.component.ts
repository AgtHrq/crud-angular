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
  product: Product
  constructor(private productService: ProductService, private router: Router) { 
    this.product = {
      name: "",
      price: 0
    }
  }

  createProduct(): void {

    if(this.anyErrors()){
      return
    }
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado com sucesso!');
      this.product.name = ""
      this.product.price = 0
      this.router.navigate(['/products'])
    })
  }

  anyErrors(): boolean {
    if(this.product.name == ""){
      this.productService.showMessage('Necessário adicionar nome ao produto.')
      return true
    }

    if(this.product.price == 0){
      this.productService.showMessage('Necessário adicionar preço ao produto')
      return true
    }
    return false
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
