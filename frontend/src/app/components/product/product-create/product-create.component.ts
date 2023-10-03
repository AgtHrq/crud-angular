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

    product = {} as ProductModel;

    constructor(private productService: ProductService,
                private router: Router) {
    }

    createProduct(): void {
       if (this.isValidFields()) {
           return;
       }
        this.productService.create(this.product).subscribe(() => {
            this.productService.showMessage('Produto criado com sucesso!');
            this.router.navigate(['products']);
        });
    }

    cancel(): void {
        this.router.navigate(['products']);
    }

    isValidFields(): boolean {
        if (this.product.name == null) {
            this.productService.showMessage("O campo nome não de ve ser vazio")
            return true;
        }
        if (this.product.price == null) {
            this.productService.showMessage("O campo preço não de ve ser vazio")
            return true;
        }
        return false;
    }
}
