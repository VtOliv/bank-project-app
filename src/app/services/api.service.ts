import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  buscarConta() {
    let url = this.http.get<any>(`http://localhost:8097/buscar`);
    return url.pipe(
      map(
        data => data
      )
    )
  }
}
