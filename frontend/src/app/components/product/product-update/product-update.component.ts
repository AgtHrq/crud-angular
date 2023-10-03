import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {ProductModel} from "../product-create/product.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-product-update',
    templateUrl: './product-update.component.html',
    styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

    product: ProductModel = {
        name: "",
        price: 0
    };

    productName: string = "";
    productPrice: number = 0;

    constructor(private productService: ProductService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.productService.readById(Number(id))
            .subscribe(product => {
                this.product = product;
                this.productName = product.name;
                this.productPrice = product.price;
            });
    }

    updateProduct(): void {
        if (this.isValidFields()) {
            return;
        }
        this.productService.update(this.product)
            .subscribe(product => {
                this.productService.showMessage('Produto atualizado com sucesso!');
                this.router.navigate(["products"]);
            });
    }

    cancel(): void {
        this.router.navigate(["products"]);
    }

    isValidFields(): boolean {
        if (this.product.name === this.productName && this.product.price === this.productPrice) {
            this.productService.showMessage("É necessário alterar algum atributo desse produto.")
            return true;
        }

        if (this.product.name === "") {
            this.productService.showMessage("O nome é obrigatorio.")
            return true;
        }

        if (this.product.price < 10 || this.product.price > 500) {
            this.productService.showMessage("O preço não deve ter valor inferior a R$ 10 ou superior a R$ 500.")
            return true;
        }
        return false;
    }
}
