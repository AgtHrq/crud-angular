import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user-create/user.model';
import { HeaderService } from '../../template/header/header.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit{
  user: User = {
    nome: '',
    cpf: '',
    rg: '',
    rendaAnual: null
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private headerService: HeaderService) {
      headerService.headerData ={
        title: 'Atualizar Cadastro de Usuário',
        icon: 'person',
        routeUrl: '/users'
      }
    }

  ngOnInit(): void {
    const id = (this.route.snapshot.paramMap.get('id'))
    this.userService.readById(Number(id)).subscribe(user => {
      this.user = user
  })
    
  }
  
  
  updateUser():void{
    this.userService.update(this.user).subscribe(user=>{
      this.userService.showMessage('Usuário atualizado com sucesso!')
      this.router.navigate(['/users'])
    })

  }

  cancelar(): void {
    this.router.navigate(['/users'])
  }
}
