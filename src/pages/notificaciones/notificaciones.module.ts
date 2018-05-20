import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Notificaciones } from './notificaciones';

@NgModule({
  declarations: [
    Notificaciones,
  ],
  imports: [
    IonicPageModule.forChild(Notificaciones),
  ],
  exports: [
    Notificaciones
  ]
})
export class NotificacionesModule {}
