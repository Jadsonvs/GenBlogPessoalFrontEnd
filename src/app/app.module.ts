import { HttpClientModule } from '@angular/common/http'//Importe para funcionamento do module HttpClientModule na service. Para conseguirmos realizar as requisições Http.
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; //import do modulo que pegará tudo no html.
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy} from '@angular/common'; //Para usar o hfre do ancora e ele funcionar de forma interna na rotas, devemos configurar em app.module.ts e colocar dois provide de localização . Então para gente sempre referenciar as rotas e o Angular não se perder, devemos importar os modules HashLocationStrategy e o LocationStrategy no app.module.ts parao Angular nunca se perder nas rotas, além de colocarmos em Providers em forma de objeto o provider: LocationStrategy e o UseClass: HashLocationStrategy.
import { ModalModule } from 'ngx-bootstrap/modal'; //ModalModule importado para que o alertas.service.ts funcione corretamente
import { OrderModule } from 'ngx-order-pipe';//Importe do OrderModule para ordeção

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { TemaComponent } from './tema/tema.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { PostagemDeleteComponent } from './delete/postagem-delete/postagem-delete.component';
import { UsuarioEditComponent } from './edit/usuario-edit/usuario-edit.component';
import { AlertasComponent } from './alertas/alertas.component';
import { UsuarioDeleteComponent } from './delete/usuario-delete/usuario-delete.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    EntrarComponent,
    CadastrarComponent,
    InicioComponent,
    TemaComponent,
    TemaEditComponent,
    TemaDeleteComponent,
    PostagemEditComponent,
    PostagemDeleteComponent,
    UsuarioEditComponent,
    AlertasComponent,
    UsuarioDeleteComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //Importe de module para funcionamento da service. Para conseguirmos realizar as requisições Http.
    FormsModule, //Importe do modulo. modulo que irá pegar tudo que está no input do html.
    ModalModule.forRoot(),//Importe do Modalmodule para funcionamento do Alertas.service.ts funcione corretamente. Devemos passar o método .forRoot() para que o ModalModule seja acessado em toda raiz do projeto e para que o @Input() funcione corretamente.
    OrderModule,//Importe do OrderModule para ordenação das postagens.
  ],

  //Para usar o hfre do ancora na tela atual e ele funcionar de forma interna na rotas, devemos configurar em app.module.ts e colocar dois provide de localização . Então para gente sempre referenciar as rotas e o Angular não se perder, devemos importar os modules HashLocationStrategy e o LocationStrategy no app.module.ts parao Angular nunca se perder nas rotas, além de colocarmos em Providers em forma de objeto o provider: LocationStrategy e o UseClass: HashLocationStrategy.
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],

  bootstrap: [AppComponent]
})
export class AppModule { }
