import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../../user/user.service";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {ContaService} from "../conta.service";
import {Conta} from "../conta-create/conta.model";

@Component({
    selector: 'app-conta-read',
    templateUrl: './conta-read.component.html',
    styleUrls: ['./conta-read.component.css']
})
export class ContaReadComponent {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    displayedColumns = ['id', 'agencia', 'conta', 'bloqueado', 'saldo', 'actions'];
    dataSource = new MatTableDataSource<Conta>();

    constructor(private contaService: ContaService,
                private userService: UserService) {
        this.refresh();
    }

    refresh() {
        this.contaService.findAll()
            .subscribe(contas => {
                this.dataSource.data = contas;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            })
    }

    updateEstadoBloqueio(id: number, blocked: MatSlideToggleChange) {
        let isblocked = blocked.checked;
        let state = '';

        if (isblocked) {
            state = "bloquear";
        } else {
            state = "desbloquear";
        }

        this.contaService.updateEstadoBloqueio(id, state).subscribe(() => {
            this.refresh();
            let b = isblocked ? "bloqueada" : "desbloqueada";
            this.userService.showMessage(`Conta ${b} com sucesso.`)
        })
    }
}
