import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-conta-crud',
  templateUrl: './conta-crud.component.html',
  styleUrls: ['./conta-crud.component.css']
})
export class ContaCrudComponent {

  constructor(private headerService: HeaderService, private router: Router){
    headerService.headerData = {
      title: 'Contas',
      icon: 'person',
      routeUrl: '/contas'
    }
  }

  navigateToContaCreate(): void {
    this.router.navigate(['/contas/create'])
  }

}
