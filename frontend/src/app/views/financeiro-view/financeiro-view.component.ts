import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Conta } from 'src/app/components/financeiro/conta/conta-create/conta.model';
import { MatTableDataSource } from '@angular/material/table';
import { ContaService } from 'src/app/components/financeiro/conta/conta.service';

@Component({
  selector: 'app-financeiro-view',
  templateUrl: './financeiro-view.component.html',
  styleUrls: ['./financeiro-view.component.css']
})
export class FinanceiroViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  conta: Conta = {
    id: 0,
    idUsuario: 0,
    numAgencia: '',
    numConta: '',
    saldo: 0,
    bloqueado: true
  }

  dataSource = new MatTableDataSource<Conta>();
  contas: Conta[] = []
  displayedColumns = ['id', 'numAgencia', 'numConta', 'saldo', 'bloqueado', 'action'];

  panelOpenState = false;

  constructor(
    private contaService: ContaService,
    private router: Router,
    private headerService: HeaderService,
    ){    
      headerService.headerData = {
        title: 'Financeiro',
        icon: 'monetization_on',
        routeUrl: '/financeiro'
      }
    }

  ngOnInit(): void {
    this.contaService.readAll().subscribe(contas => {
      this.dataSource.data = contas
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  navigateToAddConta(): void {
    this.router.navigate(['/financeiro/conta/create'])
  }

  alterarEstadoBloqueio(conta: Conta):void{
    this.contaService.alterarEstadoBloqueio(conta).subscribe(bloqueado => {
      this.dataSource.data.forEach(contaFromList => {
        if (contaFromList.id == conta.id){
          contaFromList.bloqueado = bloqueado.body
        }
      })
    })
  }

}
