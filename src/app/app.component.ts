import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( //Constructor no Angular serve para fazer a injeção das dependências/Objetos que precisamos.
    public authService: AuthService // Estamos criando o authService dentro de app.component.ts para que eu possa acessar o logado que está dentro do authservice no HTML. Criaremos como public por que iremos usar no html e não apenas no TypeScript.
  ){}
}
