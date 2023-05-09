import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Input() id: any;
  items!: MenuItem[];
  item: any;
  test: any;
  saldo!: Number;

  constructor(
    private requisicoes: ApiService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.items = [
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
        icon: PrimeIcons.EJECT,
      },
      {
        label: 'Sair',
        icon: PrimeIcons.POWER_OFF,
        routerLink: ['/login']
      }
    ];
    this.activeRoute.params.subscribe((d) => (this.test = d));

    this.requisicoes.buscarConta(this.test.numconta).subscribe((data) => {
      this.item = data;
      this.saldo = data.saldo.toFixed(2)
      console.log(this.item);
      console.log(this.saldo)
    });
  }
}
