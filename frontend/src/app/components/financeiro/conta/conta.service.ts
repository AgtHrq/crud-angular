import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Conta} from "./conta-create/conta.model";

@Injectable({
    providedIn: 'root'
})
export class ContaService {

    baseUrl = 'http://localhost:8080/treinamento/conta'

    constructor(private http: HttpClient) {
    }

    create(conta: Conta): Observable<Conta> {
        return this.http.post<Conta>(this.baseUrl, conta);
    }

    update(conta: Conta): Observable<Conta> {
        return this.http.put<Conta>(this.baseUrl, conta);
    }

    findAll(): Observable<Conta[]> {
        return this.http.get<Conta[]>(`${this.baseUrl}/all`)
    }

    readById(id: number): Observable<Conta> {
        return this.http.get<Conta>(`${this.baseUrl}?id=${id}`)
    }

    delete(id: number): Observable<Conta> {
        return this.http.delete<Conta>(`${this.baseUrl}?id=${id}`)
    }

    updateEstadoBloqueio(id: number, estado: string): Observable<Conta> {
        const params = {id: id}

        return this.http.put<Conta>(`${this.baseUrl}/${estado}`, {}, {params: params});
    }
}
