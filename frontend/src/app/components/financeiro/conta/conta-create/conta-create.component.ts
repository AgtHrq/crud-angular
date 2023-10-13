import { Component, OnInit } from '@angular/core';
import { Conta } from './conta.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/components/user/user.service';
import { ContaService } from '../conta.service';

@Component({
  selector: 'app-conta-create',
  templateUrl: './conta-create.component.html',
  styleUrls: ['./conta-create.component.css']
})
export class ContaCreateComponent implements OnInit {

  conta: Conta = {
    idUsuario: 0,
    numAgencia: '',
    numConta: '',
    saldo: 0
  }

  selectedValue: string | null = null;

  usersSelect: { value: number | undefined; viewValue: string; }[] = []

  constructor(private router: Router, private userService: UserService, private contaService: ContaService) { }

  ngOnInit(): void {
    this.userService.readAll().subscribe(users => {
      this.usersSelect = users.map(user => ({
        value: user.id,
        viewValue: user.nome
      }))
      console.log(this.usersSelect)
    })
  }

  cancel(): void {
    this.router.navigate(['/financeiro'])
  }

  createConta(): void {
    this.contaService.create(this.conta).subscribe(conta => {
      this.userService.showMessage('Conta criada com sucesso!')
      this.router.navigate(['/financeiro'])
    })
  }

}
