import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { conta } from 'src/app/models/conta';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService],
})
export class HomeComponent implements OnInit {
  @Input() id: any;
  items!: MenuItem[];
  conta!: conta;
  tipo!: any;
  route: any;
  saldo!: any;
  dono!: any;
  value!: Number;
  numconta: any;
  altTipo!: any;
  altDono!: any;

  // Variaveis modais
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
    this.activeRoute.params.subscribe((d) => (this.route = d));

    this.requisicoes.buscarConta(this.route.numconta).subscribe((data) => {
      this.conta = data;
      this.tipo = data.tipo;
      this.saldo = data.saldo.toFixed(2);
      this.dono = data.dono;
      this.numconta = data.numConta
      sessionStorage.setItem('numconta', this.numconta);

    });

    this.items = [
      {
        label: 'Extrato',
        icon: PrimeIcons.CHART_LINE,
        command: () => this.irParaExtrato()
      },
      {
        label: 'Opções',
        icon: PrimeIcons.ALIGN_JUSTIFY,
        items: [
          {
            label: 'Fechar conta',
            icon: PrimeIcons.POWER_OFF,
            command: () => this.fecharConta()
          },
          {
            label: 'Sair',
            icon: PrimeIcons.SIGN_OUT,
            routerLink: ['/login'],
          }
        ]
      }

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

  irParaExtrato(){
    this.router.navigate(['/extrato/' + this.numconta]);
  }

  show(message: string, title: string, color: string) {
    this.messageService.add({
      key: 'tc',
      severity: color,
      summary: title,
      detail: message,
    });
  }

  sacar() {
    var numconta = sessionStorage.getItem('numconta');

    this.requisicoes.saque(numconta, this.value).subscribe((data) => {
      this.show("Saque efetuado com sucesso!", "Sucesso", "success")
      setTimeout(() => {
        (this.saque = false), 400000;
      });
      this.conta.saldo = data.saldo.toFixed(2);
      this.saldo = data.saldo.toFixed(2);
      this.value = 0.0;
    });
  }

  depositar() {
    var numconta = sessionStorage.getItem('numconta');

    this.requisicoes.depositar(numconta, this.value).subscribe((data) => {
      this.show("Depósito efetuado com sucesso!", "Sucesso", "success")
      setTimeout(() => {
        (this.deposito = false), 400000;
      });
      this.conta.saldo = data.saldo.toFixed(2);
      this.saldo = data.saldo.toFixed(2);
      this.value = 0.0;
    });
  }

  pagarConta() {
    var numconta = sessionStorage.getItem('numconta');

    this.requisicoes.pagarConta(numconta, this.value).subscribe((data) => {
      this.show("Pagamento efetuado com sucesso!", "Sucesso", "success")
      setTimeout(() => {
        (this.pgto = false), 400000;
      });
      this.conta.saldo = data.saldo.toFixed(2);
      this.saldo = data.saldo.toFixed(2);
      this.value = 0.0;
    });
  }

  alterarDados(){
    var numconta = sessionStorage.getItem('numconta');

    this.requisicoes.alterar(numconta, this.altTipo, this.altDono).subscribe((data) => {
      this.show("Alteração efetuada com sucesso!", "Sucesso", "success")
      setTimeout(() => {
        (this.alterar = false), 400000;
      });
      this.conta = data;
      this.tipo = data.tipo;
      this.saldo = data.saldo.toFixed(2);
      this.dono = data.dono;
    });
  }

  fecharConta(){
    var numconta = sessionStorage.getItem('numconta');

    this.requisicoes.fecharConta(numconta).subscribe(data => 
      {
        console.log(data);
        
        this.show("Conta encerrada com sucesso!", "Sucesso", "success")
        setTimeout(() => {
          (this.router.navigate(['/login'])), 400000;
        });
      },
      err => {
        console.log(err);
        this.show(err.error.message,`Erro`, 'error')
      })
  }
}
