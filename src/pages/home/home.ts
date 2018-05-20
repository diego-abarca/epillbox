import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {BaseDatos} from "../../providers/base-datos";
import {Storage} from "../../providers/storage";
import {Info} from "../info/info";
import {AddMedicamento} from "../add-medicamento/add-medicamento";

/**
 * Generated class for the Home page.
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {

  public medicamentos: any = [];

  public current;
  public token;
  public fullToken;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private bd: BaseDatos, private storage: Storage, private alertCtrl: AlertController) {
    let self = this;
    this.bd.getMedicamentos("abcde12345", "1").subscribe(data => {
      storage.setMedicamentos(data);
      this.medicamentos = data;
    }, error=>{
      storage.getMedicamentos().then(data=>{
        this.medicamentos = data;
      })
    });
  }

  ionViewDidLoad() {
    let date = new Date();
    this.current = date.getHours() * 100 + date.getMinutes();
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

  //TODO: Notificaciones... pendiente de aprobacion

  goToInfo(med) {
    this.navCtrl.push(Info, {"med": med});
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

  goToAdd() {
    this.navCtrl.push(AddMedicamento);
  }

}
