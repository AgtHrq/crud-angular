import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HeaderService} from "../../components/template/header/header.service";

@Component({
    selector: 'app-user-crud',
    templateUrl: './user-crud.component.html',
    styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent {
    constructor(private router: Router,
                private headerService: HeaderService) {
        headerService.headerData = {
            title: "Usuários",
            icon: "person",
            routeUrl: "users"
        }
    }

    navigateToUserCreate() {
        this.router.navigate(["users/create"])
    }

}
