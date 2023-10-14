import { Observable, find } from 'rxjs';
import { UserService } from './../../../user/user.service';
import { Component, OnInit } from '@angular/core';
import { Conta } from './conta.model';
import { Router } from '@angular/router';
import { ContaService } from '../conta.service';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-conta-create',
  templateUrl: './conta-create.component.html',
  styleUrls: ['./conta-create.component.css']
})
export class ContaCreateComponent implements OnInit{
  conta: Conta = {
    idUsuario: 0,
    numAgencia: '',
    numConta: ''
  }

  usersSelect: { value: number | undefined; viewValue: string; }[] = [];
  
  constructor(
    private userService: UserService,
    private contaService: ContaService,
    private router: Router,
    private headerService: HeaderService,
    ){    
      headerService.headerData = {
        title: 'Criar uma Nova Conta',
        icon: 'monetization_on',
        routeUrl: '/financeiro'
      }
    }

  ngOnInit(): void {
      this.userService.readAll().subscribe(users =>{
        this.usersSelect = users.map(user => ({
          value: user.id,
          viewValue: user.nome
        }))
      })
  }

  createConta(): void {
    if (this.anyErrors()){
      return
    }

    
    this.contaService.create(this.conta).subscribe(conta =>{
      this.contaService.showMessage('Conta criada com sucesso!')
      this.router.navigate(['/financeiro'])
    })

  }

  cancel(): void {
    this.router.navigate(['/financeiro'])
  }

  // Alertar para o erro de conta duplicada na agencia;
  // jaExisteContaNaAgencia(): boolean  {
  //   console.log(this.contasDaAgencia)

  //   this.contaService.listarContasPorAgencia(this.conta.numAgencia)
  //     .subscribe( 
  //       conta => {this.contasDaAgencia.push(conta)
  //       console.log(this.contasDaAgencia)},
        
        
          

  //     )
    
  //   console.log(this.contasDaAgencia)

    
    
  // }

  anyErrors(): boolean {
    if(this.conta.idUsuario == 0) {
      this.contaService.showMessage("A conta precisa estar associada a um Usuário.")
      return true
    }
      
    if(this.conta.numAgencia.length != 5) {
      this.contaService.showMessage("O Número da Agência deve ter exatamente 5 dígitos")
      return true
    }
    
    if(this.conta.numConta.length != 7) {
      this.contaService.showMessage("O Número da Conta deve ter exatamente 7 dígitos")
      return true
    }
    
    // Alerta de conta duplicada 
    // if (jaExisteContaNaAgencia()){
    //   console.log('Gadjonhas')
    //   this.contaService.showMessage("Já existe uma conta com o mesmo número nesta Agência")
    //   return true
    // }
  

    return false

  }

  

}
