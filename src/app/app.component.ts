import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SlideIntro} from '../pages/slide-intro/slide-intro';

import {Storage} from "../providers/storage";

import {HeaderColor} from '@ionic-native/header-color';
import {Home} from "../pages/home/home";
import {AddMedicamento} from "../pages/add-medicamento/add-medicamento";
import {Login} from "../pages/login/login";
import {Notificaciones} from "../pages/notificaciones/notificaciones";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SlideIntro;

  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar,
              public splashScreen: SplashScreen, private headerCtrl: HeaderColor,
              public storage: Storage) {


    storage.retrieveUser().then(
      data => {
        this.rootPage = Home;
        this.initializeApp();
      },
      error => {
        this.initializeApp();
      }
    );

    this.pages = [
      {title: 'Administración', component: Home, icon: "list-box"},
      {title: 'Agregar un Medicamento', component: AddMedicamento, icon: "add-circle"},
      {title: 'Notificaciones', component: Notificaciones, icon: "alert"}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.headerCtrl.tint('#337ab7');
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title === "Administración") {
      this.nav.setRoot(page.component);
    } else {
      this.nav.push(page.component);
    }
  }

  logOut() {
    this.storage.logOut();
    this.nav.setRoot(Login);
  }
}
