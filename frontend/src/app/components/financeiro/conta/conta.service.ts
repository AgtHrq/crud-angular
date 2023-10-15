import { Observable, catchError, EMPTY } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Conta } from './conta-create/conta.model';


@Injectable({
  providedIn: 'root'
})
export class ContaService {

  baseUrl = 'http://localhost:8080/treinamento/conta'

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(conta: Conta): Observable<Conta> {
    return this.http.post<Conta>(this.baseUrl, conta).pipe(
      catchError((e) => this.errorHandler(e))
    )
  }

  alterarEstadoBloqueio(conta: Conta): Observable<any> {
    let bloqueado: boolean = conta.bloqueado as boolean;
    let id: number = conta.id as number;
    const url = `${this.baseUrl}/altera-estado-bloqueio`
    return this.http.put<Conta>(url,null, this.getOptions({ bloqueado: !bloqueado, id: id}))
  }

  readAll(): Observable<Conta[]> {
    return this.http.get<Conta[]>(`${this.baseUrl}/all`)
  }

  readById(id: number): Observable<Conta> {
    return this.http.get<Conta>(`${this.baseUrl}/?id=${id}`)
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage(e.error.detalhes[0]);
    console.log(e)
    return EMPTY;
  }

  update(conta: Conta): Observable<Conta> {
    const url = `${this.baseUrl}`
    return this.http.put<Conta>(url, conta)
  }

  delete(id: number): Observable<Conta> {
    const url = `${this.baseUrl}?id=${id}`
    return this.http.delete<Conta>(url)
  }

  public getOptions(params?: {
    [param: string]: | string | number | boolean | ReadonlyArray<string | number | boolean>;}, headers?: HttpHeaders): { headers: HttpHeaders, observe: any, params?: HttpParams, responseType?: any } {
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
    }

  }

}