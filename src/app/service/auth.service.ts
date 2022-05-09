import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
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

  logado(){ // Método criado para saber se o usuário está logado ou não, caso tenha um token o usuário estará logado caso não tenham o usuário não estará logado. Irá verificar se existe um token no meu environment, se meu environment está preenchido. Método irá retornar true ou false
    let ok: boolean = false // Início meu método dizendo que ok = false.

    if(environment.token != '') { // Se(if) environment.token for diferente de vazio, meu ok vira true(ok = true)
      ok = true
    }

    return ok // retorno um ok false se environment.token for vazio ou retorno um ok true se environment.token não for vazio.

  }
}


