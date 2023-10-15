import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Conta } from '../conta-create/conta.model';
import { MatTableDataSource } from '@angular/material/table';
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
  contas: Conta[] = []
  displayedColumns = ['id', 'numAgencia', 'numConta', 'saldo','bloqueado', 'action'];

  constructor(private contaService: ContaService){}

  ngOnInit(): void {
    this.contaService.readAll().subscribe(contas => {
      console.log(contas)
      this.dataSource.data = contas;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: any): void {
    const filterValue = event.target.value
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  alterarEstadoBloqueio(conta: Conta): void {
    this.contaService.alterarEstadoBloqueio(conta).subscribe(bloqueado => {
      this.dataSource.data.forEach(contaFromList => {
        if(contaFromList.id == conta.id){
          contaFromList.bloqueado = bloqueado.body
        }
      })
    })
  }

}
