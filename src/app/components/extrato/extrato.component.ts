import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { Extrato } from 'src/app/models/Extrato';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css'],
})
export class ExtratoComponent implements OnInit {
  @Input() id: any;
  items!: MenuItem[];
  numconta: any;
  dono!: any;
  conta: any;
  registros!: Extrato[];
  filtro: any;
  ops: any[] = [
    { label: 'Saque', value: 'saque' },
    { label: 'Depósito', value: 'deposito' },
    { label: 'Pagamentos', value: 'pgto' },
    { label: 'Remover Filtro', value: 'remover' },
  ];

  constructor(
    private requisicoes: ApiService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.activeRoute.params.subscribe((d) => (this.test = d));

    this.numconta = sessionStorage.getItem('numconta');

    this.requisicoes.buscarConta(this.numconta).subscribe((data) => {
      this.conta = data;
      this.dono = data.dono;
    });

    this.requisicoes
      .buscarExtratoPorNumconta(this.numconta)
      .subscribe((data) => {
        this.registros = data.content;
        console.log(this.registros);
      });

    this.items = [
      {
        label: 'Home',
        icon: PrimeIcons.HOME,
        routerLink: [`/home/${this.numconta}`],
      },
      {
        label: 'Opções',
        icon: PrimeIcons.ALIGN_JUSTIFY,
        items: [
          {
            label: 'Fechar conta',
            icon: PrimeIcons.POWER_OFF,
          },
          {
            label: 'Sair',
            icon: PrimeIcons.SIGN_OUT,
            routerLink: ['/login'],
          },
        ],
      },
    ];
  }

  filtrarExtrato() {

    if (this.filtro === 'remover') {
      this.requisicoes
        .buscarExtratoPorNumconta(this.numconta)
        .subscribe((data) => {
          this.registros = data.content;
          console.log(this.registros);
        });
    } else {
      this.requisicoes
        .buscarExtratoPorOps(this.numconta, this.filtro)
        .subscribe((data) => {
          this.registros = data.content;
          console.log(this.registros);
        });
    }
  }
}
