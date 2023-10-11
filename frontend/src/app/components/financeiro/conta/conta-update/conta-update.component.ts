import {Component, OnInit} from '@angular/core';
import {ContaService} from "../conta.service";
import {UserService} from "../../../user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Conta} from "../conta-create/conta.model";

@Component({
    selector: 'app-conta-edit',
    templateUrl: './conta-update.component.html',
    styleUrls: ['./conta-update.component.css']
})
export class ContaUpdateComponent implements OnInit {

    conta = {} as Conta;

    constructor(private contaService: ContaService,
                private userService: UserService,
                private router: Router,
                private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id')
        this.contaService.readById(Number(id)).subscribe(conta => {
            this.conta = conta
        })
    }

    updateConta(): void {
        this.contaService.update(this.conta).subscribe(() => {
            this.userService.showMessage('Conta atualizada com sucesso.')
            this.router.navigate(['financeiro'])
        })
    }

    cancel(): void {
        this.router.navigate(['financeiro'])
    }
}
