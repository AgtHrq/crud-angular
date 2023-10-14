import { Component, OnInit } from '@angular/core';
import { User } from '../user-create/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { HeaderService } from '../../template/header/header.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {
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
        title: 'Exclusão de Usuário',
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

  cancel(): void {
    this.router.navigate(['/users'])
  }

  deleteUser(): void {
    if (this.user.id == undefined) {
      return
    }
    this.userService.delete(this.user.id).subscribe(() => {
        this.userService.showMessage(`O Usuário de id ${this.user.id} foi removido!`)
        this.router.navigate(['/users'])
    })
      
    
    
  }
}
