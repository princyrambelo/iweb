import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { testUserAgent } from '@ionic/core/dist/types/utils/platform';
import { LocalNotifications } from '@ionic-native/local-notifications';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  implements OnInit{
agent1tab1:boolean;
soustraitanttab1:boolean;
visi:boolean;
clienttab1:boolean;
  constructor(   public storage: Storage,private router: Router,private localNotifications: LocalNotifications) { }
  ngOnInit() {

  this.test();
  }
  test(){
     if(this.router.url=="/tabs/tab1"){
       this.visi=true;
     }
     this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification',
      // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
      // data: { secret: key }
    });
  }
}
