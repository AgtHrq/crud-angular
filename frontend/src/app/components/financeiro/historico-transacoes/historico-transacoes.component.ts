import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {HistoricoService} from "./historico.service";
import {HistoricoModel} from "./historico.model";

@Component({
    selector: 'app-historico-transacoes',
    templateUrl: './historico-transacoes.component.html',
    styleUrls: ['./historico-transacoes.component.css']
})
export class HistoricoTransacoesComponent {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    displayedColumns = ['id', 'idContaPrincipal', 'idContaRelacionada', 'timestamp', 'tipo', 'valor'];
    dataSource = new MatTableDataSource<HistoricoModel>();

    constructor(private hsitoricoService: HistoricoService) {
        this.refresh();
    }

    refresh() {
        this.hsitoricoService.findAll()
            .subscribe(historico => {
                this.dataSource.data = historico;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            })
    }
}
