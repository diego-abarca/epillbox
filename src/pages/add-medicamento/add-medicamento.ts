import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController} from 'ionic-angular';
import {BaseDatos} from "../../providers/base-datos";
import {RanuraModal} from "../ranura-modal/ranura-modal";
import {Home} from "../home/home";

/**
 * Generated class for the AddMedicamento page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-medicamento',
  templateUrl: 'add-medicamento.html',
})
export class AddMedicamento {

  nombre;
  dosis;
  inventario;
  tiempo;
  inicio;
  descripcion;
  id_pastillero = "abcde12345";
  selected;
  med;
  titulo = "Agregar Medicamento";
  editing = false;

  ranura = {
    texto: "Seleccionar Ranura",
    color: "white",
    text: "black",
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public bd: BaseDatos,
              public modalCtrl: ModalController, public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {


    this.med = navParams.get("med");
    if(!this.med){
      bd.getMedicamentos("abcde12345", "1").subscribe((data:Array<any>) => {
        if (data.length === 6) {
          let alert = this.alertCtrl.create({
            title: '¡Ranuras llenas!',
            subTitle: "Finalice algún otro tratamiento para poder agregar otro medicamento",
            enableBackdropDismiss: false,
            buttons: [
              {
                text: 'Aceptar',
                handler: () => {
                  navCtrl.setRoot(Home);
                }
              }
            ]
          });
          alert.present();
        }
      });
    }else{
      this.editing = true;
      this.titulo = "Editar Medicamento";
      this.nombre = this.med.nombre;
      this.dosis = this.med.dosis;
      this.inventario = this.med.inventario;
      this.tiempo = this.med.tiempo;
      this.inicio = this.transorm(this.med.inicio);
      this.descripcion = this.med.descripcion;
      let ranura = this.ranuras[this.med.ranura -1];
      this.selected = this.med.ranura;
      this.ranura = {
        texto: ranura.texto,
        color: ranura.color,
        text: "white"
      };
    }
  }

  ranuras = [
    {
      texto: "Ranura: 1",
      color: "green"
    }, {
      texto: "Ranura: 2",
      color: "yellow"
    }, {
      texto: "Ranura: 3",
      color: "red"
    }, {
      texto: "Ranura: 4",
      color: "blue"
    }, {
      texto: "Ranura: 5",
      color: "deeppink"
    }, {
      texto: "Ranura: 6",
      color: "blueviolet"
    }
  ];

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AddMedicamento');
  }

  //TODO: Limitar a que solo pueda escoger pastilleros libres
  //TODO: Validar los campos de entrada

  agregarMedicamento() {
    let self = this;
    let cad = 'Esta seguro que desea agregar el medicamento "' + self.nombre + '"?';
    if(self.editing){
      cad = 'Esta seguro que desea guardar el medicamento "' + self.nombre + '"?';
    }
    let confirm = this.alertCtrl.create({
      title: 'Confirmar',
      message: cad,
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
            let tiempo = self.tiempo;
            tiempo = String(tiempo).replace(":", "");
            let inicio = self.inicio;
            inicio = String(inicio).replace(":", "");

            if(this.editing){
              this.bd.editMedicamento(self.med.$id, self.selected, self.nombre, self.dosis, tiempo, inicio,
              self.descripcion, self.inventario).then(data => {
                console.log(data);
                loading.dismiss();
                let alert = this.alertCtrl.create({
                  title: 'Guardado correctamente',
                  subTitle: "'" + self.nombre + "' guardado Correctamente  ",
                  enableBackdropDismiss: false,
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        this.navCtrl.setRoot(Home);
                      }
                    }
                  ]
                });
                alert.present();
              });
            }else{
              this.bd.createMedicamento(self.id_pastillero, self.descripcion,
                tiempo, self.selected, self.dosis, inicio, self.nombre, self.inventario).then(data => {
                loading.dismiss();
                let alert = this.alertCtrl.create({
                  title: 'Agregado correctamente',
                  subTitle: "'" + self.nombre + "' agregado Correctamente  ",
                  enableBackdropDismiss: false,
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        this.navCtrl.setRoot(Home);
                      }
                    }
                  ]
                });
                alert.present();
              });
            }
          }
        }
      ]
    });
    confirm.present();
  }


  //TODO: Mostrar selector de ranura

  check() {
    return (
      !this.nombre ||
      !this.dosis ||
      !this.inventario ||
      !this.tiempo ||
      !this.inicio ||
      this.ranura.text == 'black'
    );
  }


  abrirModal() {
    let profileModal;
    if(this.editing){
      profileModal = this.modalCtrl.create(RanuraModal, {"ranura": this.selected - 1});
    }else{
      profileModal = this.modalCtrl.create(RanuraModal);
    }

    profileModal.onDidDismiss(data => {
      let ran = this.ranuras[data.num];
      this.ranura.texto = ran.texto;
      this.ranura.color = ran.color;
      this.ranura.text = " white";
      this.selected = data.num + 1;
    });
    profileModal.present();
  }

  transorm(value:number){
    if(value < 100){
      let str = "" + value;
      if(value<10){
        str = "0" + value;
      }
      return "00:" + str
    }

    let str1, str2;
    str1 = "" + Math.floor(value / 100);
    str2 = "" + value%100;
    if(value/100 < 10){
      str1 = "0" + Math.floor(value / 100);
    }
    if(value%100 < 10){
      str2 = "0" + value%100;
    }

    return str1 + ":" + str2;
  }
}