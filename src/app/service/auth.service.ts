import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient //Importando o HttpClient para ser usado no arquivo (auth.service.ts)
  ) { }

  //Para entrar, o servidor deve receber um objeto usuarioLogin do tipo UsuarioLogin(model criada) como parâmetro.
  // Observable - Para que o angular observe qual o tipo de objeto que está sendo enviado e garantir que seja o objeto que queremos receber. Add o : Observable e na frente do post add <UsuarioLogin>
  entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>('http://localhost:8080/usuarios/logar', usuarioLogin) //método entrar retorna um método http do tipo método post com o caminho/endpoint + objetico(usuarioLogin) que recebemos através de parâmetro, assim conseguimos acessar nossa api pelo método logar.
  }

  cadastrar(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('http://localhost:8080/usuarios/cadastrar', usuario)
  }
}
