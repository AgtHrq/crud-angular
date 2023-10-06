import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../user-create/user.model";
import {UserService} from "../user.service";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";


@Component({
    selector: 'app-user-read',
    templateUrl: './user-read.component.html',
    styleUrls: ['./user-read.component.css']
})
export class UserReadComponent {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    displayedColumns = ['id', 'nome', 'rendaAnual', 'bloqueado', 'actions'];
    dataSource = new MatTableDataSource<User>();

    constructor(private userService: UserService) {
        this.userService.read()
            .subscribe(users => {
                this.dataSource.data = users;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            })
    }

    alteraEstadoBloqueio(id: number, bloqueado: MatSlideToggleChange) {
        this.userService.update(id, bloqueado.checked).subscribe(() => {
            let b = bloqueado.checked ? "bloqueado" : "desbloqueado";
            this.userService.showMessage(`Usuário ${b}.`)
        })
    }
}
