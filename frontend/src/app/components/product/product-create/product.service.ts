import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {ProductModel} from "./product.model";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private readonly baseUrl = 'http://localhost:3001/products';

    constructor(private snackBar: MatSnackBar,
                private http: HttpClient) {
    }

    showMessage(msg: string) {
        this.snackBar.open(msg, 'Fechar', {
            duration: 3000,
            horizontalPosition: "center",
            verticalPosition: "top"
        })
    }

    create(product: ProductModel) : Observable<ProductModel> {
        return this.http.post<ProductModel>(this.baseUrl, product);
    }
}
