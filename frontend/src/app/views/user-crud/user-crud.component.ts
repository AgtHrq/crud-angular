import { Component } from '@angular/core';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent {

  constructor(private headerService: HeaderService){
    headerService.headerData = {
      title: 'Usuários',
      icon: 'person',
      routeUrl: '/users'
    }
  }

}
