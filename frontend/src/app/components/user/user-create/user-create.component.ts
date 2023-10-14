import { HeaderData } from './../../template/header/header-data.model';
import { Component } from '@angular/core';
import { User } from './user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HeaderService } from '../../template/header/header.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  user: User = {
    nome: "",
    cpf: "",
    rg: "",
    rendaAnual: null
    
  }
  constructor(
        private userService: UserService,
        private router: Router,
        private headerService: HeaderService) {
          headerService.headerData ={
            title: 'Cadastro de Usuários',
            icon: 'person',
            routeUrl: '/users'
          }
        }

  createUser(): void {
    if (this.anyErrors()){
      return
    }

    this.userService.create(this.user).subscribe(() => {
      this.userService.showMessage("Usuário cadastrado com sucesso!")
      this.router.navigate(['/users'])
    })
  }

  anyErrors(): boolean {
    if(this.user.nome == "") {
      this.userService.showMessage("Não é possível cadastrar um usuário sem nome.")
      return true
    }

    if(this.user.nome.length < 3 || this.user.nome.length > 300) {
      this.userService.showMessage("O nome do usuário deve ter entre 3 e 300 caracteres.")
      return true
    }

    if(this.user.cpf.length !== 11) {
      this.userService.showMessage("O CPF deve ter 11 dígitos.")
      return true
    }

    if(this.user.rg.length !== 9) {
      this.userService.showMessage("O RG deve ter 9 dígitos.")
      return true
    }     

    return false

  }

  cancel(): void {
    this.router.navigate(['/users'])
  }
}
