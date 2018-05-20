import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

/*
  Generated class for the Storage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Storage {

  constructor(private nativeStorage: NativeStorage) {
  }

  setUser(user){
    this.nativeStorage.setItem('user', user)
      .then(
        () => {},
        error => console.error('Error storing item', error)
      );
  }

  retrieveUser(){
    return this.nativeStorage.getItem('user');
  }

  logOut(){
    return this.nativeStorage.remove('user');
  }

  getMedicamentos(){
    return this.nativeStorage.getItem('medicamentos');
  }

  setMedicamentos(medicamentos){
    this.nativeStorage.setItem('medicamentos', medicamentos).then(()=>{

    }, error => {console.log("error", error)});
  }

}
