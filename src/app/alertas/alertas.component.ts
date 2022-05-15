import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  //Para importar um variável que está em outro componente da aplicação basta utilizar a notação que é um método @input() e passar a variável e seu tipo.
  @Input() message: string //Utilizamos dois pontos ":" para dizer qual o tipo da variável
  @Input() tipo: string = 'success' //Utilizamos o sinal de igual "=" para dizer que a variável já irá receber um valor.


  constructor(
    public modal: BsModalRef
  ) { }

  ngOnInit() {
  }

  //Método que fecha o modal
  onClose() {
    this.modal.hide()
  }

}
