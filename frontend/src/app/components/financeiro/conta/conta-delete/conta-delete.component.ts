import { Component } from '@angular/core';
import {User} from "../../../user/user-create/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../user/user.service";
import {Conta} from "../conta-create/conta.model";
import {ContaService} from "../conta.service";

@Component({
  selector: 'app-conta-delete',
  templateUrl: './conta-delete.component.html',
  styleUrls: ['./conta-delete.component.css']
})
export class ContaDeleteComponent {

  conta = {} as Conta;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private contaService: ContaService,
              private userService: UserService) { }

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
      this.userService.showMessage("Conta excluída com sucesso.")
      this.router.navigate(['financeiro'])
    })
  }

  cancel(): void {
    this.router.navigate(['financeiro'])
  }
}
