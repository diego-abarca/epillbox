import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {AlertController, LoadingController} from 'ionic-angular';
import {Home} from "../../pages/home/home";
import {BaseDatos} from "../../providers/base-datos"
import {Storage} from "../../providers/storage"

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  user;
  password;
  ip;

  constructor(public navCtrl: NavController, public navParams: NavParams, private bs: BarcodeScanner,
              public alertCtrl: AlertController, public bd: BaseDatos, public loadingCtrl: LoadingController,
              public menuCtrl: MenuController, public storage: Storage) {
    menuCtrl.enable(false);
  }

  loginSuccess() {
    //TODO: validar que este login si funcione
    this.storage.setUser(this.user);
    this.menuCtrl.enable(true);
    this.navCtrl.setRoot(Home);
  }

  startLogin(user?, password?) {
    let self = this;
    let loading = this.loadingCtrl.create({
      content: 'Por favor espere...'
    });
    loading.present();
    setTimeout(()=>{
      if (user || self.user === 'abcde12345' && password || self.password === 'abcde12345') {
        loading.dismiss();
        this.loginSuccess();
      } else {
        loading.dismiss();
        this.showError();
      }
    }, 1500)
  }

  openQR() {
    let self = this;
    this.bs.scan({
      preferFrontCamera: false, // iOS and Android
      showFlipCameraButton: false, // iOS and Android
      showTorchButton: true, // iOS and Android
      prompt: "Apunte su cámara al código en su pastillero", // Android
      resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      formats: "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
    }).then((barcodeData) => {
      try {
        let data = JSON.parse(barcodeData.text);
        self.startLogin(data.user, data.password);
      } catch (e) {
        this.showError("Código QR no valido");
      }

    }, (err) => {
      // An error occurred
    });
  }

  check() {
    return (!this.user || !this.password);
  }

  showError(error?) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: error || "Por favor revisa el usuario o contraseña, así como tu conexión a internet",
      buttons: ["Aceptar"]
    });
    alert.present();
  }
}