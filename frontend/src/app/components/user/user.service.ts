import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, EMPTY, Observable} from "rxjs";
import {User} from "./user-create/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    readonly baseUrl = "http://localhost:8080/treinamento/usuario"

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

    create(user: User): Observable<User> {

        return this.http.post<User>(this.baseUrl, user)
            .pipe(
                catchError((e) => this.errorHandle(e))
            );
    }

    read(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}/all`)
    }

    update(id: number, bloqueado: boolean): Observable<User> {
        const params = {bloqueado: bloqueado, id: id}

        return this.http
            .put<User>(`${this.baseUrl}/altera-estado-bloqueio`, {}, {params: params});
    }

    errorHandle(e: any): Observable<any> {
        this.showMessage(e.data.detalhes[1]);
        return EMPTY;
    }
}