import { Component } from '@angular/core';
import { ViewController, AlertController, NavParams } from 'ionic-angular';
import {BaseDatos} from "../../providers/base-datos";

/**
 * Generated class for the RanuraModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-ranura-modal',
  templateUrl: 'ranura-modal.html',
})
export class RanuraModal {

  medicamentos = [];

  ranuras = [{
    text:"1",
    disponible:true
  },{
    text:"2",
    disponible:true
  },{
    text:"3",
    disponible:true
  },{
    text:"4",
    disponible:true
  },{
    text:"5",
    disponible:true
  },{
    text:"6",
    disponible:true
  }];

  constructor(public viewCtrl: ViewController, private bd:BaseDatos,
              private alertCtrl: AlertController, private navParams:NavParams) {
    let self = this;
    bd.getMedicamentos("abcde12345", "1").subscribe((data:any[]) =>{
      let ranura = this.navParams.get("ranura");
      self.medicamentos = data;
      self.medicamentos.forEach( i =>{
        self.ranuras[i.ranura - 1].text = "";
        self.ranuras[i.ranura - 1].disponible = false;
      });
      if(ranura!== undefined){
        self.ranuras[ranura].disponible = true;
        self.ranuras[ranura].text = (ranura + 1) + "";
      }
    });
  }

  dismiss(number) {
    if(this.ranuras[number].disponible==false){
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'La ranura que seleccionaste ya tiene un medicamento',
        buttons: ['Aceptar']
      });
      alert.present();
    }else{
      let data = { 'num': number };
      this.viewCtrl.dismiss(data);
    }
  }

  getStyle(number){
    if(this.ranuras[number].disponible==false){
      return "0.9em";
    }
    return "3em";
  }

}
