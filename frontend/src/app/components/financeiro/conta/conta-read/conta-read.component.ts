import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Conta } from '../conta-create/conta.model';
import { ContaService } from '../conta.service';

@Component({
  selector: 'app-conta-read',
  templateUrl: './conta-read.component.html',
  styleUrls: ['./conta-read.component.css']
})
export class ContaReadComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<Conta>();
  displayedColumns = ['id', 'idUsuario', 'numAgencia', 'numConta', 'saldo', 'bloqueado' , 'action'];
  contas: Conta[] = []

  constructor(private contaService: ContaService){}

  ngOnInit(): void {
    this.contaService.readAll().subscribe(contas => {
      console.log(contas)
      this.dataSource.data = contas
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  alterarEstadoBloqueio(conta: Conta): void {
    this.contaService.alterarEstadoBloqueio(conta).subscribe(bloqueado => {
      var contaAlterada = this.dataSource.data.find(c => c.id === conta.id)
      if(contaAlterada) contaAlterada.bloqueado = !conta.bloqueado
    })
  }
}
