import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product-creat/product.model';
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
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const id = (this.route.snapshot.paramMap.get('id'))
    this.productService.readById(Number(id)).subscribe(product => {
      this.product = product
    })
      
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe(product => {
      this.productService.showMessage("Produto Atualizado com sucesso!")
      this.router.navigate(['/products'])
    })

}
}
