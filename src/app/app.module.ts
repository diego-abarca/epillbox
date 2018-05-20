import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BarcodeScanner} from '@ionic-native/barcode-scanner';
import { HttpModule } from '@angular/http';
import { HeaderColor } from '@ionic-native/header-color';
import { NativeStorage } from '@ionic-native/native-storage';

import { MyApp } from './app.component';
import { SlideIntro } from '../pages/slide-intro/slide-intro';
import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';
import { AddMedicamento } from '../pages/add-medicamento/add-medicamento';
import { RanuraModal } from '../pages/ranura-modal/ranura-modal';
import {Info} from "../pages/info/info";
import {Notificaciones} from "../pages/notificaciones/notificaciones";

import { Alarma } from "../pipes/alarma";

import { BaseDatos} from "../providers/base-datos";
import { Storage} from "../providers/storage";


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyD3xIkBSccOSmoSzSSYFHe-ZcN01ha0gUs",
  authDomain: "epillbox-1b2ab.firebaseapp.com",
  databaseURL: "https://epillbox-1b2ab.firebaseio.com",
  projectId: "epillbox-1b2ab",
  storageBucket: "",
  messagingSenderId: "924920956328"
};

@NgModule({
  declarations: [
    MyApp,
    SlideIntro,
    Login,
    Home,
    AddMedicamento,
    RanuraModal,
    Alarma,
    Info,
    Notificaciones
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SlideIntro,
    Login,
    Home,
    AddMedicamento,
    RanuraModal,
    Info,
    Notificaciones
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    HeaderColor,
    BaseDatos,
    NativeStorage,
    Storage,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
