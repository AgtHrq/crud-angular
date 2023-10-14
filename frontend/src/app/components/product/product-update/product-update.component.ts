import { HeaderService } from '../../template/header/header.service';
import { Product } from './../product-creat/product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit{
  product: Product = {
    name: '',
    price: 0
  }
  
  constructor (
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Atualizar Informações do Produto',
        icon: 'storefront',
        routeUrl: '/products'
  
      }
    }

  private productName = ""
  private productPrice = 0


  
  ngOnInit(): void {
    const id = (this.route.snapshot.paramMap.get('id'))
    this.productService.readById(Number(id)).subscribe(product => {
      this.product = product
      this.productName = product.name
      this.productPrice = product.price
    })
      
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

  anyErrors(): boolean {
    if (this.product.name == "") {
      this.productService.showMessage("É preciso inserir o nome do Produto")
      return true
    }

    if(this.product.name == this.productName && this.product.price == this.productPrice) {
      this.productService.showMessage("Não há alterações a serem lançadas")
      return true
    }
    
    if(this.product.price <= 10 || this.product.price >= 500) {
      this.productService.showMessage("O preço deve estar entre R$ 10 e  R$ 500.")
      return true
    }
    
    return false

  }

  updateProduct(): void {
    if (this.anyErrors()){
      return
    }

    this.productService.update(this.product).subscribe(product => {
      this.productService.showMessage("Produto Atualizado com sucesso!")
      this.router.navigate(['/products'])
    })

  }
}
