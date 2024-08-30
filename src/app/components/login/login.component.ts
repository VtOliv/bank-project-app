import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  constructor(
    private requisicoes: ApiService,
    private router: Router,
    private msg: MessageService
  ) {}

  value: any;
  back: any;
  criar = false;
  tipo: any;
  dono: any;
  pass: any;
  stateOptions: any[] = [
    { label: 'Conta Corrente', value: 2 },
    { label: 'Conta Poupança', value: 1 },
  ];

  ngOnInit() {}

  abrirCriar() {
    this.criar = true;
  }

  abrirHome(id: any) {
    this.router.navigate(['/home/' + id]);
  }

  logar() {
    this.requisicoes.logar(this.value, this.pass).subscribe((data) => {

      if (data) {
        this.buscarConta()
      } else {
        this.show(
          'Essa conta está desativada ou a senha está incorreta',
          `Erro`,
          'error'
        );
      }
    });
  }

  buscarConta() {
    this.requisicoes.buscarConta(this.value).subscribe(
      (data) => {
        if (data.status === 'Ativo') {
          this.back = data;
          this.abrirHome(data.numConta);
        } else {
          this.show('Essa conta está desativada', `Erro`, 'error');
        }
      }
    );
  }

  criarConta() {
    this.requisicoes.criar(this.tipo, this.dono, this.pass).subscribe((data) => {
      this.back = data;
      this.abrirHome(data.numConta);
    });
  }

  show(message: string, title: string, color: string) {
    this.msg.add({
      key: 'tc',
      severity: color,
      summary: title,
      detail: message,
    });
  }
}
