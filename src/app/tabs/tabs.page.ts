import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  agent1:boolean;
  soustraitant:boolean;
  client:boolean;
  constructor( public storage: Storage) {}

}
