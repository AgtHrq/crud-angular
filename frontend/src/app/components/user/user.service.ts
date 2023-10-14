import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from './user-create/user.model';
import { EMPTY, Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  baseUrl = "http://localhost:8080/treinamento/usuario"

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'Fechar', {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user).pipe(
      catchError((e) => this.errorHandler(e))
    )
  }

  readAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/all`)
  }

  alterarEstadoBloqueio(user: User): Observable<any> {
    let bloqueado: boolean = user.bloqueado as boolean;
    let id: number = user.id as number;
    const url = `${this.baseUrl}/altera-estado-bloqueio`
    return this.http.put<User>(url,null, this.getOptions({ bloqueado: !bloqueado, id: id}))
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

  
  readById(id: number): Observable<User> {
    const url = `${this.baseUrl}/usuario-${id}`  
    return this.http.get<User>(url)
  }

  update(user: User): Observable<User> {
    const url = `${this.baseUrl}`  
    return this.http.put<User>(url, user)
  }

  delete (id: number) {
    const url = `${this.baseUrl}?id=${id} `  
    return this.http.delete(url)
  }

  errorHandler (e: any):Observable<any> {
    this.showMessage(e.error.detalhes[1]);
    return EMPTY;
  }

  
}
