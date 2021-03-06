import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  //Para entrar, o servidor deve receber um objeto usuarioLogin do tipo UsuarioLogin(model criada) como parâmetro.
  // Observable - Para que o angular observe qual o tipo de objeto que está sendo enviado e garantir que seja o objeto que queremos receber. Add o : Observable e na frente do post add <UsuarioLogin>
  entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>('https://springblogpessoal.herokuapp.com/usuarios/logar', usuarioLogin) //método entrar retorna um método http do tipo método post com o caminho/endpoint + objetico(usuarioLogin) que recebemos através de parâmetro, assim conseguimos acessar nossa api pelo método logar.
  }

  cadastrar(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('https://springblogpessoal.herokuapp.com/usuarios/cadastrar', usuario)
  }

  atualizar(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>('https://springblogpessoal.herokuapp.com/usuarios/atualizar', usuario, this.token)
  }

  deletar(id: number) {
    return this.http.delete(`https://springblogpessoal.herokuapp.com/usuarios/${id}`, this.token)
  }

  getByIdUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`https://springblogpessoal.herokuapp.com/usuarios/${id}`, this.token)
  }

  logado(){ // Método criado para saber se o usuário está logado ou não, caso tenha um token o usuário estará logado caso não tenham o usuário não estará logado. Irá verificar se existe um token no meu environment, se meu environment está preenchido. Método irá retornar true ou false
    let ok: boolean = false // Início meu método dizendo que ok = false.

    if(environment.token != '') { // Se(if) environment.token for diferente de vazio, meu ok vira true(ok = true)
      ok = true
    }

    return ok // retorno um ok false se environment.token for vazio ou retorno um ok true se environment.token não for vazio.

  }

  //Método adm para saber se o usuário é administrador da página e poder sumir com elementos, caso não seja adm
  adm() {
    let ok: boolean = false

    if(environment.tipo == 'adm') {
      ok = true
    }

    return ok
  }

}


