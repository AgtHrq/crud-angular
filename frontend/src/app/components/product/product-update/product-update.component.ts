import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {ProductModel} from "../product-create/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

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

    constructor(private productService: ProductService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.productService.readById(Number(id))
            .subscribe(product => {
                this.product = product;
            });
    }

    updateProduct(): void {
        this.productService.update(this.product)
            .subscribe(() => {
                this.productService.showMessage('Produto atualizado com sucesso!');
                this.router.navigate(["products"]);
            });
    }

    cancel(): void {
        this.router.navigate(["products"]);
    }


}
