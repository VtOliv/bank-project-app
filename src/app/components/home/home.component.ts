import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  items!: MenuItem[];

  constructor(private requisicoes: ApiService) {}

  

  ngOnInit() {
    this.items = [
      {
        label: 'Login',
        icon: PrimeIcons.USER,
        routerLink: ['/login'],
      },
      {
        label: 'Sacar',
        icon: PrimeIcons.MONEY_BILL,
      },
      {
        label: 'Depositar',
        icon: PrimeIcons.MONEY_BILL,
      },
      {
        label: 'Pagar conta',
        icon: PrimeIcons.CREDIT_CARD,
      },
      {
        label: 'Fechar conta',
        icon: PrimeIcons.POWER_OFF,
      },
    ];
  }
}
