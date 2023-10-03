import { Component, OnInit } from '@angular/core';
import { Product } from '../product-creat/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0
  }

  productName: string = ""
  productPrice: number = 0

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readByid(Number(id)).subscribe(product => {
      this.product = product
      this.productName = product.name
      this.productPrice = product.price
    })
  }

  updateProduct(): void {

    if (this.anyErrors()) {
      return
    }

    this.productService.update(this.product).subscribe(product => {
      this.productService.showMessage('Produto atualizado com sucesso!')
      this.router.navigate(['/products']);
    })
  }

  anyErrors(): boolean {

    if(this.productName == this.product.name && this.productPrice == this.product.price ){
      this.productService.showMessage('É necessário alterar algum atributo desse produto.');
      return true;
    }

    if(this.product.price < 10 || this.product.price > 500){
      this.productService.showMessage('O valor desse produto deve ser inferior a R$500,00 e superior a R$10,00.');
      return true;
    }

    if(this.product.name == ""){
      this.productService.showMessage('Você deve adicionar um nome ao seu produto.');
      return true;
    }

    return false
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

}
