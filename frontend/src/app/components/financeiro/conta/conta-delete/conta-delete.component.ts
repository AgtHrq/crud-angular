import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Conta } from '../conta-create/conta.model';
import { ContaService } from '../conta.service';

@Component({
  selector: 'app-conta-delete',
  templateUrl: './conta-delete.component.html',
  styleUrls: ['./conta-delete.component.css']
})
export class ContaDeleteComponent implements OnInit {

  conta: Conta = {
    id: 0,
    idUsuario:0,
    numAgencia: '',
    numConta: '',
    saldo: 0
  }

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private contaService: ContaService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.contaService.readById(Number(id)).subscribe(conta => {
      this.conta = conta
    })
  }

  deleteConta(): void {
    if(this.conta.id == undefined){
      return
    }
    this.contaService.delete(this.conta.id).subscribe(conta => {
      this.contaService.showMessage("Conta excluída com sucesso.")
      this.router.navigate(['/financeiro'])
    })
  }

  cancel(): void {
    this.router.navigate(['/financeiro'])
  }


}

