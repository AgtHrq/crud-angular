import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conta } from './conta-create/conta.model';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  baseUrl = 'http://localhost:8080/treinamento/conta';


  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'Fechar', {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(conta: Conta): Observable<Conta> {
    return this.http.post<Conta>(this.baseUrl, conta);
  }

  readAll(): Observable<Conta[]>{
    return this.http.get<Conta[]>(`${this.baseUrl}/all`)
  }

  alterarEstadoBloqueio(conta: Conta): Observable<any> {
    let bloqueado: boolean = conta.bloqueado as boolean;
    let id: number = conta.id as number;
    let bloqueioDesbloqueio = bloqueado == false ? 'bloquear' : 'desbloquear'
    const url = `${this.baseUrl}/${bloqueioDesbloqueio}`
    return this.http.put<Conta>(url,null, this.getOptions({ bloqueado: !bloqueado, id: id}))
  }

  public getOptions(params?: {
    [param: string]: | string | number | boolean | ReadonlyArray<string | number | boolean>;}, 
    headers?: HttpHeaders): { headers: HttpHeaders, observe: any, params?: HttpParams, responseType?: any }
    {
    let finalHeaders: HttpHeaders = headers ? headers : new HttpHeaders({
      'Content-Type': 'application/json',
    })

    let finalParams: HttpParams | null = params? new HttpParams({fromObject: params}): null;

    if (!finalHeaders.has('Content-Type')) {
      finalHeaders = finalHeaders.set('Content-Type', 'application/json');
    }

    return finalParams ? {
      headers: finalHeaders,
      observe: 'response' as 'response',
      params: finalParams
    } : {
      headers: finalHeaders,
      observe: 'response' as 'response'
    }}

    readById(id: number): Observable<Conta> {
      const url = `${this.baseUrl}?id=${id}`  
      return this.http.get<Conta>(url)
    }

    update(conta: Conta): Observable<Conta> {
      const url = `${this.baseUrl}`  
      return this.http.put<Conta>(url, conta)
    }

    delete (id: number) {
      const url = `${this.baseUrl}?id=${id}`  
      return this.http.delete(url)
    }

    listarContasPorAgencia(numAgencia: string):Observable<String> {
      const url = `${this.baseUrl}/contas-por-agencia?numAgencia=${numAgencia}`
      return this.http.get<String>(url) 
    }


}
