import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContaService } from '../conta.service';
import { Conta } from '../conta-create/conta.model';

@Component({
  selector: 'app-conta-update',
  templateUrl: './conta-update.component.html',
  styleUrls: ['./conta-update.component.css']
})
export class ContaUpdateComponent implements OnInit {

  conta: Conta = {
    idUsuario: 0,
    numAgencia: '',
    numConta: '',
    saldo: 0
  }

  constructor(private router: Router, private route: ActivatedRoute, private contaService: ContaService){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.contaService.readById(Number(id)).subscribe( c =>{
      this.conta = c
    })
  }

  updateConta(): void {
    this.contaService.update(this.conta).subscribe(c => {
      this.contaService.showMessage('Conta atualizada com sucesso!')
      this.router.navigate(['/financeiro']);
    })
  }

  cancel(): void {
    this.router.navigate(['/financeiro'])
  }

}
