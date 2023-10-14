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
export class ContaReadComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<Conta>();
  users: Conta[] = []
  displayedColumns = ['id', 'numAgencia', 'numConta', 'saldo','bloqueado' , 'action'];
}
//   constructor(private ContaService> ContaService)

//   ngOnInit (): void {
//     this.userService.readAll().subscribe(contas => {
//     console.log(contas)
//       this.dataSource.data = contas;
//       this.dataSource.paginator = this.paginator;
//       this.dataSource.sort = this.sort;
//   })
// }