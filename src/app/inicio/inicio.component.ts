import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  tema: Tema = new Tema()
  idTema: number
  listaTemas: Tema[]

  usuario: Usuario = new Usuario()
  idUsuario = environment.id

  constructor(
    private router: Router, //Injeção da dependencia/Objeto Router para que possamos utilizá-la no this.router.navigate([]) do IF abaixo para direcionar o usuário para tela de login, caso ele atualize a página e seja deslogado
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    //Será verificado se o token está vazio, caso esteja irá aparecer um alert para o usuário e ele será direcionado para a tela de login
    if(environment.token == '') {
      //alert('Sua secção expirou,faça login novamente')
      this.router.navigate(['/entrar']) // Utilizando o router da dependencia Router(injetada no arquivo) com o navigate para direcionar o usuário para tela de login.
    }

    this.authService.refreshToken()
    this.getAllTemas()
    this.getAllPostagens()

  }

  getAllTemas() {
      this.temaService.getAllTemas(). subscribe((resp: Tema[]) => {
        this.listaTemas = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema). subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens(). subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findByIdUsuario() {
    this.authService.getByIdUsuario(this.idUsuario). subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }


  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    console.log(this.postagem)

    this.postagemService.postPostagem(this.postagem). subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })

  }

}
