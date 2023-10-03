import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product-creat/product.model';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  products: Product[] = []
  displayedColumns = ['id', 'name', 'price', 'action'];

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = products
      console.log(products)
    })
  }
}
