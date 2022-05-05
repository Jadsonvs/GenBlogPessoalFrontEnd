import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin

  constructor(
    private auth: AuthService,
    private router: Router // depencia que enos envia para alguma página após entrar
  ) { }

  ngOnInit(): void{
    window.scroll(0,0)
  }

  entrar(){
    this.auth.entrar(this.usuarioLogin).subscribe({
      next: (resp: UsuarioLogin)=> {
      this.usuarioLogin = resp

      environment.token = this.usuarioLogin.token //para utilizarmos variaveis global no Angular devemos introduzi-las dentro do environment.prod.ts e chama-las como envinroment.(atributo) = this.(variável).atributo. Environment são objetos que nos ajuda a trabalhar com variaveis global além de outra funções. Environments são variáveis globais, acessívels a todos os componentes.
      environment.nome = this.usuarioLogin.nome
      environment.id = this.usuarioLogin.id
      environment.foto = this.usuarioLogin.foto

      console.log(environment.token)

      console.log(environment.nome)

      console.log(environment.id)

      console.log(environment.foto)

      this.router.navigate(['/inicio'])
    },
    error: erro =>{
      if(erro.status == 401){
        alert('Usuário ou senha estão incorretos')
      }
    },
    });
  }
}

