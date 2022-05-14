import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPostagem: number

  constructor(
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    //Será verificado se o token está vazio, caso esteja irá aparecer um alert para o usuário e ele será direcionado para a tela de login
    if(environment.token == '') {
      //alert('Sua secção expirou,faça login novamente')
      this.router.navigate(['/entrar']) // Utilizando o router da dependencia Router(injetada no arquivo) com o navigate para direcionar o usuário para tela de login.
    }

    this.idPostagem = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPostagem)
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  apagar() {
    this.postagemService.deletePostagem(this.idPostagem).subscribe(() => {
      alert('Apagado com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }

}
