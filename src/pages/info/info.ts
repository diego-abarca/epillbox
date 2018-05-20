import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';

import { BaseDatos} from "../../providers/base-datos"
import { AddMedicamento} from "../../pages/add-medicamento/add-medicamento"

import {Home} from "../home/home";

/**
 * Generated class for the Info page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class Info {

  current;

  public med;

  constructor(public navCtrl: NavController, public navParams: NavParams, public bd: BaseDatos,
              public loadingCtrl:LoadingController, public alertCtrl: AlertController) {
    this.med = navParams.get("med");
    console.log(this.med);
  }

  ionViewDidLoad() {
    let date = new Date();
    this.current = date.getHours() * 100 + date.getMinutes();
  }

  edit(){
    this.navCtrl.push(AddMedicamento, {"med" :this.med});
  }

  getNextAlarm(med) {
    let actual = parseInt(this.current);
    let inicio = parseInt(med.inicio);
    let tiempo = parseInt(med.tiempo);

    if (actual < inicio) {
      while (inicio > actual && inicio > 0) {
        inicio -= tiempo;
      }
      return inicio + tiempo;
    } else {
      while (actual >= inicio) {
        inicio += tiempo;
      }
      if (inicio >= 2400) {
        inicio -= 2400;
      }
      return inicio;
    }
  }

  returnColor(num) {
    let cadena: string;
    switch (num) {
      case 1:
        cadena = "green";
        break;
      case 2:
        cadena = "yellow";
        break;
      case 3:
        cadena = "red";
        break;
      case 4:
        cadena = "blue";
        break;
      case 5:
        cadena = "deeppink";
        break;
      case 6:
        cadena = "blueviolet";
        break;
    }
    ;
    return cadena;
  }

  finish(){
    let self=this;
    let confirm = this.alertCtrl.create({
      title: 'Confirmar',
      message: 'Esta seguro que desea terminar el tratamiento de "' + this.med.nombre + '"?',
      buttons: [
        {
          text: 'Regresar',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Por favor espere...'
            });
            loading.present();
            self.bd.editActivo(self.med, "0").then(data => {
              loading.dismiss();
              let alert = this.alertCtrl.create({
                title: 'Terminado correctamente',
                subTitle: "'" + self.med.nombre + "' terminado Correctamente  ",
                enableBackdropDismiss: false,
                buttons: [
                  {
                    text: 'Aceptar',
                    handler: () => {
                      self.navCtrl.setRoot(Home);
                    }
                  }
                ]
              });
              alert.present();
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
