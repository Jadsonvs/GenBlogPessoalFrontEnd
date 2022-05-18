import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

   //1º criamos o nosso objeto http no construtor com o HttpClient para termos acesso aos métodos HTTP(GET,POST,PUT,DELETE).
   constructor(private http: HttpClient) { }

   //2º Para termos acesso ao endpoint do tema precisamos utilizar o nosso token em Headers no Authotization. Para isso criaremos um Objeto token que irá receber um Headers.
   token = {
     headers: new HttpHeaders().set('Authorization', environment.token)
   }

   getAllPostagens(): Observable<Postagem[]> {
     return this.http.get<Postagem[]>('https://springblogpessoal.herokuapp.com/postagens', this.token)
   }

   getByIdPostagem(id: number): Observable<Postagem> {
     return this.http.get<Postagem> (`https://springblogpessoal.herokuapp.com/postagens/${id}`, this.token)
   }

   getByTituloPostagem(titulo: string): Observable<Postagem[]> {
    return this.http.get<Postagem[]> (`https://springblogpessoal.herokuapp.com/postagens/titulo/${titulo}`, this.token)
   }

   postPostagem(postagem: Postagem): Observable<Postagem> {
     return this.http.post<Postagem>('https://springblogpessoal.herokuapp.com/postagens', postagem, this.token)
   }

   putPostagem(postagem: Postagem): Observable<Postagem> {
     return this.http.put<Postagem> ('https://springblogpessoal.herokuapp.com/postagens', postagem, this.token)
   }

   deletePostagem(id: number) {
     return this.http.delete<Postagem> (`https://springblogpessoal.herokuapp.com/postagens/${id}`, this.token)
   }
}
