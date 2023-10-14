import { Component, OnInit } from '@angular/core';
import { Conta } from '../conta-create/conta.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContaService } from '../conta.service';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-conta-update',
  templateUrl: './conta-update.component.html',
  styleUrls: ['./conta-update.component.css']
})
export class ContaUpdateComponent implements OnInit{
  conta: Conta = {
    id: 0,
    idUsuario: 0,
    numAgencia: '',
    numConta: '',
    saldo: 0,
    bloqueado: true
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contaService: ContaService,
    private headerService: HeaderService,
    ){    
      headerService.headerData = {
        title: 'Atualizar Informações da Conta',
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
    
  updateConta():void{
    this.contaService.update(this.conta).subscribe(conta=>{
      this.contaService.showMessage('Conta atualizada com sucesso!')
      this.router.navigate(['/financeiro'])
    })

  }

  cancelar(): void {
    this.router.navigate(['/financeiro'])
  }
}
