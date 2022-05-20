import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  //Iremos criar essas variáveis para que a variável nome receba o valor vindo de environment.nome e a variável foto receba o valor vindo de environment.foto, assim na secção nome e foto do menu eles estejam com os valores vindo do cadastro do banco de dados do backe-end.
  //Para usar a valor dessas variáveis nome e foto, iremos interpolar seus valores no HTML
  nome = environment.nome
  foto = environment.foto
  id = environment.id

  constructor(
    private router: Router, //Injetado o Router no arquivo para direcionarmos o usuário para alguma rota, no caso a rota entrar no método sair.
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  //Método para quando o usuário clicar no botão sair, ele seja deslogado(environments zerados) e direcionado para página de login. Foi criado um Evento de (click) na tag <a> do HTML aonde se encontrar o SAIR
  sair() {
    this.router.navigate(['/entrar']) //Utilizando o router(Após feita a injeção da dependencia/Objeto Router) com navigate para direcionar nosso usuário para alguma rota, no caso a rota de entrar.

    //Para zerar os environments apenas passamos o valor vazio para todos, e sem valores no environmetns o usuário é deslogado.
    environment.token = ''
    environment.nome = ''
    environment.foto = ''
    environment.id = 0
  }

}
