import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: 'repporting',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../repporting/repporting.module').then(m => m.RepportingPageModule)
          }
        ]
      },
      {
        path: 'planning',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../planning/planning.module').then(m => m.PlanningPageModule)
          }
        ]
      },
      {
        path: 'gestionagent',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../gestionagent/gestionagent.module').then(m => m.GestionagentPageModule)
          }
        ]
      },
      {
        path: 'modifgestion',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../modifgestion/modifgestion.module').then(m => m.ModifgestionPageModule)
          }
        ]
      },
      {
        path: 'assigne',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../assigne/assigne.module').then(m => m.AssignePageModule)
          }
        ]
      },
      {
        path: 'setting',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../setting/setting.module').then(m => m.SettingPageModule)
          }
        ]
      },
      // {
      //   path: '',
      //   redirectTo: '/tabs/tab1',
      //   pathMatch: 'full'
      // }
    ]
  },
  // {
  //   path: '',
  //   redirectTo: '/tabs/tab1',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
