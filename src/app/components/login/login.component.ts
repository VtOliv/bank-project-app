import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private requisicoes: ApiService, private router: Router) {}

  value: any
  back: any

  ngOnInit() {
    
  }

  abrirHome(id: any){
    this.router.navigate(['/home/' + id]);
  }

  buscarConta(){
    this.requisicoes.buscarConta(this.value).subscribe(data => {
      this.back = data 
      console.log(data)
      this.abrirHome(data.numConta)
    })
  }


}
