import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {ProductModel} from "./product-create/product.model";
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
        this.snackBar.open(msg, 'X', {
            duration: 3000,
            horizontalPosition: "center",
            verticalPosition: "top"
        })
    }

    create(product: ProductModel): Observable<ProductModel> {
        return this.http.post<ProductModel>(this.baseUrl, product);
    }

    read(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(this.baseUrl);
    }

    readById(id: number): Observable<ProductModel> {
        return this.http.get<ProductModel>(`${this.baseUrl}/${id}`);
    }

    update(product: ProductModel): Observable<ProductModel> {
        return this.http.put<ProductModel>(`${this.baseUrl}/${product.id}`, product);
    }

    delete(id: number): Observable<ProductModel> {
        return this.http.delete<ProductModel>(`${this.baseUrl}/${id}`);
    }
}