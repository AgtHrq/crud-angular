import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HistoricoModel} from "./historico.model";

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  baseUrl = "http://localhost:8080/treinamento/historico-transacoes/"
  constructor(private http: HttpClient) { }

  findAll(): Observable<HistoricoModel[]> {
    return this.http.get<HistoricoModel[]>(`${this.baseUrl}/all`);
  }
}
