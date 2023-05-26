import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { conta } from '../models/conta';
import { formAlteracao } from '../models/formAlteracao';
import { PageResponse } from '../models/PageResponse';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  transacao: any = {
    numconta: Number,
    valor: Number,
  };

  buscarConta(numconta: Number) {
    let url = this.http.get<conta>(
      `http://localhost:8097/buscar?numconta=${numconta}`
    );
    return url.pipe(map((data) => data));
  }

  saque(numconta: any, valorDoSaque: any) {
    this.transacao.numconta = numconta;
    this.transacao.valor = valorDoSaque;

    let url = this.http.put<any>(`http://localhost:8097/sacar`, this.transacao);
    return url.pipe(map((data) => data));
  }

  depositar(numconta: any, valorDoDeposito: any) {
    this.transacao.numconta = numconta;
    this.transacao.valor = valorDoDeposito;

    let url = this.http.put<any>(
      `http://localhost:8097/depositar`,
      this.transacao
    );
    return url.pipe(map((data) => data));
  }

  pagarConta(numconta: any, valorDoPagamento: any) {
    this.transacao.numconta = numconta;
    this.transacao.valor = valorDoPagamento;

    let url = this.http.put<any>(
      `http://localhost:8097/pagarConta`,
      this.transacao
    );
    return url.pipe(map((data) => data));
  }

  alterar(numconta: any, tipo?: any, dono?: any) {
    var form = new formAlteracao();
    form.tipo = tipo;
    form.dono = dono;

    let url = this.http.put<conta>(
      `http://localhost:8097/alterar/${numconta}`,
      form
    );
    return url.pipe(map((data) => data));
  }

  criar(tipo: any, dono: any) {
    var form = new formAlteracao();
    form.tipo = tipo;
    form.dono = dono;

    let url = this.http.post<conta>(`http://localhost:8097/criar`, form);
    return url.pipe(map((data) => data));
  }

  buscarExtratoPorNumconta(numconta: Number) {
    let url = this.http.get<PageResponse>(
      `http://localhost:8097/buscarExtrato?numconta=${numconta}`
    );
    return url.pipe(map((data) => data));
  }

  buscarExtratoPorOps(numconta: Number, operacao: String) {
    let url = this.http.get<PageResponse>(
      `http://localhost:8097/buscarExtrato?numconta=${numconta}&operacao=${operacao}`
    );
    return url.pipe(map((data) => data));
  }

  fecharConta(numconta: any) {
    let url = this.http.put<any>(
      `http://localhost:8097/fecharConta?numconta=${numconta}`,numconta
    );
    return url.pipe(map((data) => data));
  }
}
