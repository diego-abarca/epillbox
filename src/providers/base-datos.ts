import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from "rxjs/Observable";
import _ from 'lodash';

/*
  Generated class for the BaseDatos provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BaseDatos {

  public medicamentos:any = [];

  constructor(private afDB: AngularFireDatabase) {
  }

  getMedicamentos(id_pastillero: string, activo:string){
    return new Observable(observer => {
      this.afDB.object(id_pastillero + '/activos').valueChanges().subscribe(data=>{
        if(data){
          let keys = Object.keys(data);
          let array=[]
          keys.forEach(m=>{
            array.push(Object.assign({$id: m}, data[m]))
          })
          observer.next(array);
        }else{
          observer.next([])
        }
      })
    })
  }

  createMedicamento(id_pastillero, descripcion, tiempo, ranura, dosis, inicio, nombre, inventario){
    let data = {
      descripcion: descripcion || null,
      tiempo,
      dosis,
      inicio,
      nombre,
      inventario,
      ranura
    };
    return this.afDB.database.ref(id_pastillero).child('activos').push(data);
  }

  editActivo(med, activo){
    if(activo==="0"){
      console.log(med);
      let key = med.$id;
      delete med.$id;
      this.afDB.database.ref('abcde12345').child('inactivos').child(key).set(med);
      return this.afDB.database.ref('abcde12345').child('activos').child(key).set(null)
    }
  };

  editMedicamento($id, ranura, nombre, dosis, tiempo, inicio, descripcion, inventario){
    let data = {
      ranura,
      nombre,
      dosis,
      tiempo,
      inicio,
      descripcion,
      inventario
    }

    return this.afDB.database.ref('abcde12345').child('activos').child($id).update(data)
  }

  getNotificaciones(id_pastillero){
    return new Observable(observer => {
      this.afDB.object(id_pastillero + '/notificaciones').valueChanges().subscribe(data=>{
        if(data){
          let keys = Object.keys(data);
          let array=[]
          keys.forEach(m=>{
            array.push(Object.assign({$id: m}, data[m]))
          })
          observer.next(array);
        }else{
          observer.next([])
        }
      })
    })
  }
}
