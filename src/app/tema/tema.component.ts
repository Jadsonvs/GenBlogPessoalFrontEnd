import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  //Instanciando um Objeto tema do tipo Tema.
  tema: Tema = new Tema()
  //Criar uma variável listaTema do tipo Tema[] array, esse Obejto Tema[] podemos encontrar em tema.service.ts no método getAllTemas
  listaTemas: Tema[]


  constructor(
    private router: Router, //Injeção da dependencia/Objeto Router para que possamos utilizá-la no this.router.navigate([]) do IF abaixo para direcionar o usuário para tela de login, caso ele atualize a página e seja deslogado
    private temaService: TemaService, //importar a dependencia TemaService e nomear a variável com temaService
    private alertas: AlertasService,
  ) { }

  ngOnInit(): void {
    //Será verificado se o token está vazio, caso esteja irá aparecer um alert para o usuário e ele será direcionado para a tela de login
    if(environment.token == '') {
      this.alertas.showAlertInfo('Sua secção expirou, faça login novamente')
      this.router.navigate(['/entrar']) // Utilizando o router da dependencia Router(injetada no arquivo) com o navigate para direcionar o usuário para tela de login.
    }

    //If para bloquear/sumir o componente cadastrar tema caso o usuário não seja adm.
    if (environment.tipo != 'adm') {
      this.alertas.showAlertInfo('Você precisa ser administrador para acessar essa rota')
      this.router.navigate(['/inicio'])
    }

    this.findAllTemas()//Chamando o método findAlltemas  em ngOnInit() irá listar todos os temas automáticamente sempre que acessarmos a página tema.

  }

  //Método para listar todos os nossos temas cadastrado. Acessamos o Objeto temaService, utilizamos o método getAlltemas e não passamos nada, já que não vamos entregar nada, damos um um subscribe e dentro da arrow function recebmos como resposta um Objeto Tema array(resp: Tema[]).
  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[])=>{
      this.listaTemas = resp//Chamamos a variável listaTemas que é um array e vamos colocar resp(que é um array) dentro de listaTemas.
    })
  }

  // Ao criar o método cadastrar vamos acessar o Objeto temaService e utilizar o método POST contido nele, passando o Objeto tema. Utilizaremos um subscribe para transformar o arquivo typescript em json, passando uma arrow function que irá responder(resp) com o Objeto Tema.
  cadastrar() {
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      this.alertas.showAlertSuccess('Tema cadastrado com sucesso')
      this.findAllTemas()//Chamando o método findAllTemas() Irá trazer minha lista atualizada assim que eu cadastrar um novo tema na minha tabela
      this.tema = new Tema()//Instanciando novamente o Objeto tema para que quando criarmos um tema, o input do tema fique vazio novamente.
    })
  }

}
