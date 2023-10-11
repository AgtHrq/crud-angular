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
       this.refresh();
    }

    refresh() {
        this.userService.readAll()
            .subscribe(users => {
                this.dataSource.data = users;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            })
    }

    updateEstadoBloqueio(id: number, bloqueado: MatSlideToggleChange) {
        this.userService.updateEstadoBloqueio(id, bloqueado.checked).subscribe(() => {
            this.refresh();
            let b = bloqueado.checked ? "bloqueado" : "desbloqueado";
            this.userService.showMessage(`Usuário ${b}.`)
        })
    }

    applyFilter(event: any): void {
        const filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
