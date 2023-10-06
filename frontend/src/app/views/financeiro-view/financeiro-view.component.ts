import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-financeiro-view',
  templateUrl: './financeiro-view.component.html',
  styleUrls: ['./financeiro-view.component.css']
})
export class FinanceiroViewComponent {

  panelOpenState = false;

  constructor(private headerService: HeaderService, private router: Router){
    headerService.headerData = {
      title: 'Financeiro',
      icon: 'shopping_cart',
      routeUrl: '/financeiro'
    }
  }

  navigateToAddConta(): void {
    this.router.navigate(['/financeiro/conta/create'])
  }

}
