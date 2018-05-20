import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMedicamento } from './add-medicamento';

@NgModule({
  declarations: [
    AddMedicamento,
  ],
  imports: [
    IonicPageModule.forChild(AddMedicamento),
  ],
  exports: [
    AddMedicamento
  ]
})
export class AddMedicamentoModule {}
