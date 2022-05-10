import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  //Como vou receber um tema preciso isntanciar.
  tema: Tema = new Tema

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute//Dependencia que irá pegar a rota que está ativa no momento na página
  ) { }

  ngOnInit(): void {

    //Será verificado se o token está vazio, caso esteja irá aparecer um alert para o usuário e ele será direcionado para a tela de login
    if(environment.token == '') {
      //alert('Sua secção expirou,faça login novamente')
      this.router.navigate(['/entrar']) // Utilizando o router da dependencia Router(injetada no arquivo) com o navigate para direcionar o usuário para tela de login.
    }

    let id = this.route.snapshot.params['id']//Variável para receber o valor do id(nome do parâmetro que estou mandando na rota) da rota que está ativa, assim que eu entrar nessa página.
    this.findbyIdTema(id)//Para o findbyidtema trazer o tema pelo id.
  }

  findbyIdTema(id: number) {
    return this.temaService.getByIdTema(id).subscribe((resp: Tema) =>{
      this.tema = resp
    })
  }

  atualizar() {
    return this.temaService.putTema(this.tema). subscribe((resp: Tema) => {
      this.tema = resp
      alert('Tema atualizado com sucesso!')
      this.router.navigate(['/tema'])
    })
  }

}
