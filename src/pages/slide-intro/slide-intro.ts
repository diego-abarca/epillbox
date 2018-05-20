import { Component } from '@angular/core';
import { Login } from '../login/login'
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SlideIntro page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-slide-intro',
  templateUrl: 'slide-intro.html',
})
export class SlideIntro {

  constructor(private navCtrl: NavController, private navParams: NavParams) {
  }

  slides = [
    {
      title: "ePillBox!",
      description: "ePillBox, el asistente médico que te ayudará a mejorar tu calidad de vida y tu salud",
      image: "assets/img/logo.png",
    },
    {
      title: "¿Qué es ePillBox?",
      description: "ePillBox es un pastillero, que cuenta con dispensador automático, que suministra el medicamento indicado en tiempo y forma. El usuario podrá guardar información y programar el sistema de acuerdo a los horarios y medicamentos recetados. ",
      image: "assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "¿Cómo empiezo a utilizar ePillBox?" ,
      description: "<p>ePillBox te da dos opciones de inicio de sesión:</p>" +
      "<p>La primera y la más fácil es por medio de un código QR que encontraras en la pantalla de tu ePillBox, Apunta la app al QR y podrás empezar. </p>" +

      "<p>La segunda es mediante un usuario y una contraseña que tambien encontraras en la pantalla de tu ePillBox</p>",
    }
  ];

  goToLogin(){
    this.navCtrl.setRoot(Login);
  }

  //TODO: Terminar el intro

}
