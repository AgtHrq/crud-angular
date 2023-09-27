import {Component} from '@angular/core';
import {ProductService} from "../product.service";
import {Router} from "@angular/router";
import {ProductModel} from "./product.model";

@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {

    product: ProductModel = {
        name: "",
        price: 0
    }
    constructor(private productService: ProductService,
                private router: Router) {
    }

    createProduct(): void {
        this.productService.create(this.product).subscribe(() => {
            this.productService.showMessage('Produto criado com sucesso!')
        });
    }

    cancel(): void {
        this.router.navigate(['products']);
    }
}
