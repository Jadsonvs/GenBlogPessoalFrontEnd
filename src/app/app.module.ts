import { HttpClientModule } from '@angular/common/http'//Importe para funcionamento do module HttpClientModule na service. Para conseguirmos realizar as requisições Http.
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; //import do modulo que pegará tudo no html.
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { InicioComponent } from './inicio/inicio.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    EntrarComponent,
    CadastrarComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //Importe de module para funcionamento da service. Para conseguirmos realizar as requisições Http.
    FormsModule //Importe do modulo. modulo que irá pegar tudo que está no input do html.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
