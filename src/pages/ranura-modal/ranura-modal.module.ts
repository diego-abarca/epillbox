import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RanuraModal } from './ranura-modal';

@NgModule({
  declarations: [
    RanuraModal,
  ],
  imports: [
    IonicPageModule.forChild(RanuraModal),
  ],
  exports: [
    RanuraModal
  ]
})
export class RanuraModalModule {}
