import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
 
  { path: 'planning', loadChildren: './planning/planning.module#PlanningPageModule' },
  { path: 'gestionagent', loadChildren: './gestionagent/gestionagent.module#GestionagentPageModule' },
  { path: 'modifgestion', loadChildren: './modifgestion/modifgestion.module#ModifgestionPageModule' },
  { path: 'setting', loadChildren: './setting/setting.module#SettingPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
