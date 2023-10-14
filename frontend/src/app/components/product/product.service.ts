import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from './product-creat/product.model';
import { EMPTY, Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  baseUrl = "http://localhost:3001/products"

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'Fechar', {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      catchError((e) => this.errorHandler(e))
    )
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
  }

  readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id} `  
    return this.http.get<Product>(url)
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id} `  
    return this.http.put<Product>(url, product)
  }

  delete (id: number) {
    const url = `${this.baseUrl}/${id} `  
    return this.http.delete(url)
  }

  errorHandler (e: any):Observable<any> {
    this.showMessage ("Ocorreu um erro!");
    return EMPTY;
  }

}
