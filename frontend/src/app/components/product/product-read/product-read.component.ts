import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {ProductModel} from "../product-create/product.model";

@Component({
    selector: 'app-product-read',
    templateUrl: './product-read.component.html',
    styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

    products: ProductModel[] = [];
    displayedColumns = ['id', 'name', 'price', 'actions'];

    constructor(private productService: ProductService) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.productService.read()
            .subscribe(products => {
                this.products = products;
            });
    }

    deleteProduct(id: number) {
        this.productService.delete(id)
            .subscribe(() => {
                this.refresh();
                this.productService.showMessage("Produto removido com sucesso!")
            });
    }
}
