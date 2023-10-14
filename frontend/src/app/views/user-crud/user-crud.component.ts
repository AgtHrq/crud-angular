import { HeaderService } from 'src/app/components/template/header/header.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent {
    
  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData ={
      title: 'Usuários',
      icon: 'person',
      routeUrl: '/users'
    }
  }

  navigateToUserCreate(): void {
    this.router.navigate(['/users/create'])
  }

}
