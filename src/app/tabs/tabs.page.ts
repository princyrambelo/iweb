import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirebaseProvider } from 'src/providers/firebase/firebase';
import * as moment from 'moment';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  agent1:boolean;
  soustraitant:boolean;
  client:boolean;
  users:any;
  notif:boolean;
  today:any;
  i:any;
  agent:any;
  user:any;
  constructor(  private toastController: ToastController,public storage: Storage,private router: Router,public fire: FirebaseProvider) {
    // this.router.navigate(['tabs/tab1'])
  }
  ngOnInit() {
    
  }
 
 
}
