import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../product.service";
import {ProductModel} from "../product-create/product.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
    selector: 'app-product-read',
    templateUrl: './product-read.component.html',
    styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    displayedColumns = ['id', 'name', 'price', 'actions'];
    dataSource = new MatTableDataSource<ProductModel>();

    constructor(private productService: ProductService) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.productService.read()
            .subscribe(products => {
                this.dataSource.data = products;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    applyFilter(event: any): void {
        const filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
