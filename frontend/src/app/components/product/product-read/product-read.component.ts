import {Component} from '@angular/core';
import {ProductService} from "../product.service";
import {ProductModel} from "../product-create/product.model";

@Component({
    selector: 'app-product-read',
    templateUrl: './product-read.component.html',
    styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent {

    products: ProductModel[] = [];

    constructor(private productService: ProductService) {
        this.productService.read().subscribe(products => {
            this.products = products;
        });
    }
}
