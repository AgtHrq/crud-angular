import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user-create/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  user: User = {
    nome: '',
    cpf: '',
    rendaAnual: null,
    rg: ''
  }

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.userService.readById(Number(id)).subscribe(user => {
      this.user = user
    })
  }

  updateUser(): void {
    this.userService.update(this.user).subscribe(user => {
      this.userService.showMessage('Usuário atualizado com sucesso!')
      this.router.navigate(['/users']);
    })
  }

  cancel(): void {
    this.router.navigate(['/users'])
  }

}
