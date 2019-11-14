import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
// import { SettingPageModule } from 'src/app/setting/setting.module';

import { IonicModule } from '@ionic/angular';

import { GestionagentPage } from './gestionagent.page';

const routes: Routes = [
  {
    path: '',
    component: GestionagentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    // SettingPageModule,
  ],
  declarations: [GestionagentPage]
})
export class GestionagentPageModule {}
