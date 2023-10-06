import { UserService } from './../user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {

  user: User = {
    cpf: '',
    nome: '',
    rg: '',
    rendaAnual: null
  }

  constructor(private userService: UserService, private router: Router) { }

  createUser(): void {

    if(this.anyErrors()){
      return
    }

    this.userService.create(this.user).subscribe(() => {
      this.userService.showMessage('Usuário criado com sucesso!');
      this.user.nome = ""
      this.user.cpf = ""
      this.user.rg = ""
      this.user.rendaAnual = null
      this.router.navigate(['/users'])
    })
  }

  anyErrors(): boolean {
    if(this.user.cpf.length !== 11){
      this.userService.showMessage('Cpf do usuário deve conter 11 dígitos');
      return true
    }
    if(this.user.rg.length !== 9){
      this.userService.showMessage('Rg do usuário deve conter 9 dígitos');
      return true
    }
    if(this.user.nome.length < 3 || this.user.nome.length > 300){
      this.userService.showMessage('Nome do usuário deve conter mais que 3 letras e menos que 300');
      return true
    }
    return false
  }

  cancel(): void {
    this.router.navigate(['/users'])
  }

}
