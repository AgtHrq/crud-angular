import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "./user.model";
import {UserService} from "../user.service";

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {

    user = {} as User;

    constructor(private userService: UserService,
                private router: Router) {
    }

    createUser() {
        this.userService.create(this.user)
            .subscribe(() => {
                this.userService.showMessage("Usuário salvo com sucesso.");
                this.router.navigate(["users"])
            });
    }

    anyErrors(): boolean {
        if (this.user.cpf.length !== 11) {
            this.userService.showMessage("CPF inválido.");
            return true;
        }

        if (this.user.rg.length !== 9) {
            this.userService.showMessage("RG inválido.");
            return true;
        }

        if (this.user.nome.length < 3 || this.user.nome.length > 300) {
            this.userService.showMessage("O nome deve tem entre 3 e 300 caracteres.");
            return true;
        }


        return false;
    }

    cancel() {
        this.router.navigate(['users'])
    }
}
