import { Component, OnInit } from '@angular/core';
import { Conta } from '../conta-create/conta.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContaService } from '../conta.service';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-conta-delete',
  templateUrl: './conta-delete.component.html',
  styleUrls: ['./conta-delete.component.css']
})
export class ContaDeleteComponent implements OnInit {
  conta: Conta = {
    id: 0,
    idUsuario: 0,
    numAgencia: '',
    numConta: '',
    saldo: 0,
    bloqueado: true
  }
  
  constructor (
    private router: Router,
    private contaService: ContaService,
    private route: ActivatedRoute,
    private headerService: HeaderService)
    {    
      headerService.headerData = {
        title: 'Encerrar uma Conta',
        icon: 'monetization_on',
        routeUrl: '/financeiro'
      }
    }

  ngOnInit(): void {
    const id = (this.route.snapshot.paramMap.get('id'))
    this.contaService.readById(Number(id)).subscribe(conta => {
      this.conta = conta
    })
      
  }

  cancel(): void {
    this.router.navigate(['/financeiro'])
  }

  async deleteConta() {
    const id  = (this.route.snapshot.paramMap.get('id'))
    this.contaService.delete(Number(id)).subscribe(() => {
        this.contaService.showMessage(`A Conta de id ${id} foi encerrada!`)
        this.router.navigate(['/financeiro'])
    })
      
    
    
  }
}