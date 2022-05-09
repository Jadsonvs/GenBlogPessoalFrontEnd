import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private router: Router //Injeção da dependencia/Objeto Router para que possamos utilizá-la para direcionar o usuário para tela de login, caso ele atualize a página e seja deslogado
  ) { }

  ngOnInit(): void {

    //Será verificado se o token está vazio, caso esteja irá aparecer um alert para o usuário e ele será direcionado para a tela de login
    if(environment.token == '') {
      //alert('Sua secção expirou,faça login novamente')
      this.router.navigate(['/entrar']) // Utilizando o router da dependencia Router(injetada no arquivo) com o navigate para direcionar o usuário para tela de login.
    }
  }

}
