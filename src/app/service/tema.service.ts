//É nesse tema.service.ts que iremos por os métodos de consumo da minha API, da minha classe, da minha model Tema.

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

 //1º criamos o nosso objeto http no construtor com o HttpClient para termos acesso aos métodos HTTP(GET,POST,PUT,DELETE).
  constructor(private http: HttpClient) { }

  //2º Para termos acesso ao endpoint do tema precisamos utilizar o nosso token em Headers no Authotization. Para isso criaremos um Objeto token que irá receber um Headers.
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  //3º criando os métodos com o Observable e com o os métodos HTTP(GET,POST,PUT,DELETE).
  //Para criar um método que nos retorna mais de um valor, devemos utilizar e incluir uma array[] no Objeto para nos trazer uma array de tema. Ex: O Observable irá receber uma resposta Tema que poderia vir com um ou vários temas; O get poderá encontrar mais de um tema, por isso o array[].

  //Método GET irá buscar um array de tema(podemndo vir um ou mais temas) no endpont https://springblogpessoal.herokuapp.com/tema e para acessar esse endpoint iremos passar o nosso Objeto token.
  getAllTemas(): Observable<Tema[]>{
    return this.http.get<Tema[]>('https://springblogpessoal.herokuapp.com/tema', this.token)
  }

  //Método POST para criar uma requisição do tipo Tema e inclur dentro do banco de dados. Esse método post irá criar uma requisição do tipo Tema, que irá criar um tema por vez(por isso não passamos o array[]). Para acessar nosso endpoint https://springblogpessoal.herokuapp.com/tema passamos nosso Objeto token.
  postTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>('https://springblogpessoal.herokuapp.com/tema',tema, this.token)
  }

}
