import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  //instanciando um objeto do tipo UsuarioLogin. Será usado em ngModel no html

  usuario: Usuario = new Usuario //Objeto  UsuarioLogin instanciado em cadastro para que toda informação em cadastro.component.html seja lida e usada no momento do login.
  confirmarSenhar: string //Variável criada para armazenar o valor pego pelo evento input em senha
  tipoUser: string

  constructor( //Constructor no Angular serve para fazer a injeção/instanciar das dependências/Objeto
    private authService: AuthService, //Criamos o objeto authService dentro do constructor para referenciamos o AuthService(será injetado a dependência dentro do documento) para que possamos cadastrar o usuário caso as senhas sejam iguais
    private router: Router, // variável com dependencia Router para redirecionar para uma página
    private alertas: AlertasService,
  ) { }

  // Apagaremos o: void do ngonInit.
  ngOnInit(){

    window.scroll(0,0) // Para que fique no (eixo x=0 e y=0) no top da tela

  }

  confirmSenha(event: any) { //Criado método em TypeScript recebendo um evento do tipo qualquer(any).
    this.confirmarSenhar = event.target.value //o que tiver no valor do input((input)="confirmSenha($event)") ele armazenará na variável confirmarSenha

  }

  tipoUsuario(event: any) { //Método criado para o tipo de usuário(value=Adm ou value=normal)
    this.tipoUser = event.target.value
  }

  cadastrar() {
    this.usuario.tipo = this.tipoUser
    if (this.usuario.senha != this.confirmarSenhar) {
      this.alertas.showAlertdanger('As senhas estão incorretas.')
    } else {
      this.authService.cadastrar(this.usuario).subscribe({
        next: (resp: Usuario) =>{
        this.usuario = resp
        this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!')
        this.router.navigate(['/entrar']);
        },
        error: (erro) => {
          if(erro.status == 400) {
            this.alertas.showAlertdanger('Preencha todos os campos corretamente para cadastrar um usuario!')
          }}
        })
     }
  }

  validaNome(){
    if(this.usuario.nome.length < 3){
      let usuario = (<HTMLDivElement>document.querySelector('#nome'))
      usuario.style.borderColor = 'red';
      usuario.style.boxShadow = '0 0 1em red';
    }else{
      let usuario = (<HTMLDivElement>document.querySelector('#nome'))
      usuario.style.borderColor = 'green';
      usuario.style.boxShadow = '0 0 1em green';

    }

}

  validaEmail() {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(this.usuario.usuario.match(regex)) {
      let usuario = (<HTMLDivElement>document.querySelector('#usuario'))
      usuario.style.borderColor = 'green';
      usuario.style.boxShadow = '0 0 1em green';
    } else {
      let usuario = (<HTMLDivElement>document.querySelector('#usuario'))
      usuario.style.borderColor = 'red';
      usuario.style.boxShadow = '0 0 1em red';
    }
  }


}
