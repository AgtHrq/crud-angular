import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../user-create/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  user = {} as User;

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private userService: UserService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.userService.readById(Number(id)).subscribe(user => {
      this.user = user
    })
  }

  deleteUser(): void {
    if(this.user.id == undefined){
      return
    }
    this.userService.delete(this.user.id).subscribe(user => {
      this.userService.showMessage("Usuário excluído com sucesso.")
      this.router.navigate(['/users'])
    })
  }

  cancel(): void {
    this.router.navigate(['/users'])
  }


}
