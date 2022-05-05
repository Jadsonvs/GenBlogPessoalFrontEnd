import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
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

  constructor(
    private authService: AuthService, //Criamos o objeto authService dentro do constructor para referenciamos o AuthService(será injetado a dependência dentro do documento) para que possamos cadastrar o usuário caso as senhas sejam iguais
    private router: Router // variável com dependencia Router para redirecionar para uma página
  ) { }

  // Apagaremos o: void do ngonInit.
  ngOnInit(): void{

    window.scroll(0,0) // Para que fique no (eixo x=0 e y=0) no top da tela

  }

  confirmSenha(event: any) { //Criado método em TypeScript recebendo um evento do tipo qualquer(any).
    this.confirmarSenhar = event.target.value //o que tiver no valor do input((input)="confirmSenha($event)") ele armazenará na variável confirmarSenha

  }

  tipoUsuario(event: any) { //Método criado para o tipo de usuário(value=Adm ou value=normal)
    this.tipoUser = event.target.value
  }

  cadastrar() { //
    this.usuario.tipo = this.tipoUser //  A variável "tipo" dentro do objetvo usuario irá receber o valor da variável "tipoUser", que contém o valor que foi selecionado na <tag> select do html.

    if(this.usuario.senha != this.confirmarSenhar) { //if para validação de senhas
      alert('As senhas estão incorretas')

    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp //usuario será igual a resp do subscribe
        this.router.navigate(['/entrar'])
        alert('Usuário cadastrado com sucesso!')
      })//chamamos o objeto authSerive e o método cadastrar passando o objeto usuario. Utilizamos o "subscribe" para enviar ao servido o objeto usuario como JSON e não como TypeScript, ou seja o subscribe sobescreve o obejto TypeScript em JSON. Utilizamos um ero function entre parentese ( () => {} ) que irá me responder(resp é uma variável) um Usuario
    }

  }

}
