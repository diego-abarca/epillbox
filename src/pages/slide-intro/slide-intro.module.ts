import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SlideIntro } from './slide-intro';

@NgModule({
  declarations: [
    SlideIntro,
  ],
  imports: [
    IonicPageModule.forChild(SlideIntro),
  ],
  exports: [
    SlideIntro
  ]
})
export class SlideIntroModule {}
