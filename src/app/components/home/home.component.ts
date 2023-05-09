import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService],
})
export class HomeComponent implements OnInit {
  @Input() id: any;
  items!: MenuItem[];
  item: any;
  test: any;
  saldo!: Number;
  nome!: any;
  value!: Number;
  saque = false;
  deposito = false;
  pgto = false;
  alterar = false;

  constructor(
    private requisicoes: ApiService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public messageService: MessageService
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((d) => (this.test = d));

    this.requisicoes.buscarConta(this.test.numconta).subscribe((data) => {
      this.item = data;
      this.saldo = data.saldo.toFixed(2);
      this.nome = data.dono;
      sessionStorage.setItem('numconta', data.numConta);
    });

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
        routerLink: ['/login'],
      },
    ];
  }

  abrirSaque() {
    this.saque = true;
  }
  abrirDeposito() {
    this.deposito = true;
  }
  abrirPgto() {
    this.pgto = true;
  }
  abrirAlteracao() {
    this.alterar = true;
  }

  sacar() {
    var numconta = sessionStorage.getItem('numconta');

    this.requisicoes.saque(numconta, this.value).subscribe((data) => {
      this.messageService.add({
        key: 'bc',
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Saque efetuado',
        life: 400000,
      });
      setTimeout(() => {
        (this.saque = false), 400000;
      });
      this.saldo = data.saldo.toFixed(2);
    });
  }

  ngOnDestroy() {}
}
