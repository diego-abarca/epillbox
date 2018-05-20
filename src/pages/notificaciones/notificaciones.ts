import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BaseDatos} from "../../providers/base-datos";

/**
 * Generated class for the Notificaciones page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notificaciones',
  templateUrl: 'notificaciones.html',
})
export class Notificaciones {

  notificaciones = [];
  otherDay = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public bd:BaseDatos) {
    bd.getNotificaciones("abcde12345").subscribe((data:any[])=>{
      this.notificaciones = data;
    })
  }

  checkNewDay(item){

  }
}
