import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUsuario: number //Variável idUsuario criada para que eu guardde o ID que eu vou pegar na minha rota ativa.
  tipoUser: string
  confirmarSenhar: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute, //Para pegar um parametro(aqui no caso um ID) em uma rota ativa.
    private alertas: AlertasService,
  ) { }

  ngOnInit(){
    window.scroll(0,0)

   //Será verificado se o token está vazio, caso esteja irá aparecer um alert para o usuário e ele será direcionado para a tela de login
   if(environment.token == '') {
    this.alertas.showAlertInfo('Sua secção expirou,faça login novamente')
    this.router.navigate(['/entrar']) // Utilizando o router da dependencia Router(injetada no arquivo) com o navigate para direcionar o usuário para tela de login.
  }

  this.idUsuario = this.route.snapshot.params['id']//A variável idUsuario irá guardar/receber o parâmetro id da rota ativa
  this.getByIdUsuario(this.idUsuario)//o método getByIdUsuario irá pegar o parâmetro id que foi guardado pela variável idUsuario, que recebeu da rota ativa.

  }

  confirmSenha(event: any) {
    //Criado método em TypeScript recebendo um evento do tipo qualquer(any).
    this.confirmarSenhar = event.target.value //o que tiver no valor do input((input)="confirmSenha($event)") ele armazenará na variável confirmarSenha
  }

  tipoUsuario(event: any) {
    //Método criado para o tipo de usuário(value=Adm ou value=normal)
    this.tipoUser = event.target.value
  }

   atualizar() {
     this.usuario.tipo = this.tipoUser //  A variável "tipo" dentro do objetvo usuario irá receber o valor da variável "tipoUser", que contém o valor que foi selecionado na <tag> select do html.

    if(this.usuario.senha != this.confirmarSenhar) { //if para validação de senhas
      this.alertas.showAlertdanger('As senhas estão incorretas')

    } else {
      this.authService.atualizar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp //usuario será igual a resp do subscribe
        this.router.navigate(['/inicio'])
        this.alertas.showAlertSuccess('Usuário atualizado com sucesso, faça o login novamente.')

        //Zerando os environment com os valores de parâmetros necessários para se manter logado, assim deslogamos nosso usuário e mandamos  ele para a tela de login para que ele faça o login novamente e suas informações atualizadas seja vista por ele.
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0
        this.router.navigate(['/entrar'])

      })//chamamos o objeto authSerive e o método atualizar passando o objeto usuario. Utilizamos o "subscribe" para enviar ao servido o objeto usuario como JSON e não como TypeScript, ou seja o subscribe sobescreve o obejto TypeScript em JSON. Utilizamos um ero function entre parentese ( () => {} ) que irá me responder(resp é uma variável) um Usuario
    }

  }

  //getByIdUsuario(Parâmetro que irá receber da variável idusuario e seu tipo)
  getByIdUsuario(id: number) {
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp
      this.usuario.senha = '' //Deixamos a senha do usuáario como vazia para que não apareça o token codificado no momento de editar o usuário
    })
  }

}
