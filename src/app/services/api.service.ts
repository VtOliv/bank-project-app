import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  transacao: any = {
    numconta: Number,
    valor: Number
  }

  buscarConta(numconta: Number) {
    let url = this.http.get<any>(`http://localhost:8097/buscar?numconta=${numconta}`);
    return url.pipe(
      map(
        data => data
      )
    )
  }

  saque(numconta: any, valorDoSaque: any) {

    this.transacao.numconta = numconta
    this.transacao.valor = valorDoSaque
    
    let url = this.http.put<any>(`http://localhost:8097/sacar` , this.transacao);
    return url.pipe(
      map(
        data => data
      )
    )
  }
}
