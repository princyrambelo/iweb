import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  agent1:boolean;
soustraitant:boolean;
client:boolean;
  constructor(   public storage: Storage,) {}
  ngOnInit() {
  }
  
}
