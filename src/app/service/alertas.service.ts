import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal' //import do módulo BsModalService no arquivo alertas.service.ts que vem de ngx-bootstrap/modal.
import { AlertasComponent } from '../alertas/alertas.component';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(
    private bsModalService: BsModalService //Criado variável bsModalService para injeção da dependêncica BsModalService dentro da Service de alertas, para que possamos usar os alerts personalizados.
  ) { }

  //Criado método privado showAlert que vamos passar como parâmetros a message(qual vai ser o mensagem do alerta) do tipo string e o tipo(qual tipo de alerta ex: success, danger etc..) do tipo string. Vamos criar uma constante(o valor não altera) bsModalRef do tipo BsModalRef que vai receceber o método show vindo do bsModalRef que vai amostrar os alertas do componente Alertas. Atribuimos o tipo e a msg no content type e message que vem da variável bsModalref.
  private showAlert(message: string, tipo: string) {
    const bsModalRef: BsModalRef = this.bsModalService.show(AlertasComponent)
    bsModalRef.content.type = tipo
    bsModalRef.content.message = message
  }

  //Criando os alertas
  showAlertdanger(message: string) {
    this.showAlert(message, 'danger')
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, 'success')
  }

  showAlertInfo(message: string) {
    this.showAlert(message, 'info')
  }
}
