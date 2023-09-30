import { Component, OnInit } from '@angular/core';
import { Product } from '../product-creat/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
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

  async deleteProduct() {
    const id  = (this.route.snapshot.paramMap.get('id'))
    this.productService.delete(Number(id)).subscribe(() => {
        this.productService.showMessage(`O Produto de id ${id} foi removido!`)
        this.router.navigate(['/products'])
    })
      
    
    
  }
}
