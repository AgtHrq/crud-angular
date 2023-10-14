import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Conta } from './conta-create/conta.model';
import { HttpClient } from '@angular/common/http';
import { __read } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  baseUrl = 'http://localhost:8080/treinamento/conta'

  constructor(private http: HttpClient) { }

  create(conta: Conta): Observable<Conta> {
    return this.http.post<Conta>(this.baseUrl, conta);
  }

}


// readAll(): Observable<conta[]> {
//   return this.http.get<Conta[]>(`${this.baseUrl}/all`)
// }
