import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {ProductModel} from "../product-create/product.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-product-delete',
    templateUrl: './product-delete.component.html',
    styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

    product: ProductModel = {
        name: "",
        price: 0
    }

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

    deleteProduct() {
        if (this.product.id == undefined) {
            alert("Seu id é indefinido")
            return;
        }
        this.productService.delete(this.product.id)
            .subscribe(() => {
                this.productService.showMessage("Produto removido com sucesso!")
                this.router.navigate(["products"])
            });
    }

    cancel() {
        this.router.navigate(["products"])
    }
}
