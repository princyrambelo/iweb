import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  implements OnInit{
agent1tab1:boolean;
soustraitanttab1:boolean;
clienttab1:boolean;
  constructor(   public storage: Storage,) { }
  ngOnInit() {
  
  }

}
