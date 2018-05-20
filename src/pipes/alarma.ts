import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the Alarma pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'alarma',
})
export class Alarma implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number) {
    if(value < 100){
      let str = "" + value;
      if(value<10){
        str = "0" + value;
      }
      return "00:" + str + " AM"
    }

    let str1, str2, time;
    str1 = "" + Math.floor(value / 100);
    str2 = "" + value%100;
    time = "AM";
    if(value/100 < 10){
      str1 = "0" + Math.floor(value / 100);
    }
    if(value%100 < 10){
      str2 = "0" + value%100;
    }

    if(value >=1200){
      time = "PM";
    }

    return str1 + ":" + str2 + " " + time;

  }
}
