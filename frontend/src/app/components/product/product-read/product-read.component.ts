import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product-creat/product.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HeaderService } from '../../template/header/header.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  dataSource = new MatTableDataSource<Product>();
  products: Product[] = []
  displayedColumns = ['id', 'name', 'price', 'action'];

  constructor(
    private productService: ProductService,
    private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Produtos',
        icon: 'storefront',
        routeUrl: '/products'
  
      }
    }
  
  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.dataSource.data = products
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }
  
  applyFilter(event: any):void {
    const filterValue = event.target.value.trim().toLowerCase()
    this.dataSource.filter = filterValue

  }
}
