import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ModifgestionPage } from './modifgestion.page';

const routes: Routes = [
  {
    path: '',
    component: ModifgestionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModifgestionPage]
})
export class ModifgestionPageModule {}
