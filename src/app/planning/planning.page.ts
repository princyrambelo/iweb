import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FirebaseProvider } from 'src/providers/firebase/firebase';
import { testUserAgent } from '@ionic/core/dist/types/utils/platform';
@Component({
  selector: 'app-planning',
  templateUrl: './planning.page.html',
  styleUrls: ['./planning.page.scss'],
})
export class PlanningPage  implements OnInit {
  planning:any;
  planning1:any;
  agent:any;
  agentcust:any;
  id:any;
  bool:any=0;
  agent1plan:boolean;
  soustraitantplan:boolean;
  clientplan:boolean;
  constructor(   public storage: Storage,  public fire: FirebaseProvider) {  }

  ngOnInit() {
    this.init();
  }
  init(){ 
    this.storage.get('login').then((sessionsplan: any) => { this.id=sessionsplan; console.log(sessionsplan+'plan'); });
    this.storage.get('type').then((sessionplan: any) => {  console.log(sessionplan);
    if(sessionplan=="agent"){
      this.agent1plan=true;
      this.soustraitantplan=false;
      this.clientplan=false;
    }
    if(sessionplan=="soustraitant"){
      this.agent1plan=false;
      this.soustraitantplan=true;
      this.clientplan=false;
    }
    if(sessionplan=="client"){
      this.agent1plan=false;
      this.soustraitantplan=false;
      this.clientplan=true;
    }
    this.getplanning();
  }).catch(() => {
  });}
  getplanning(){
            this.fire.getplanning().subscribe(data => {
              this.agent=data.map(e=> {
            if (this.id == e.payload.child('idagent').val()){
              console.log(this.id+'gg');
              console.log(e.payload.child('idagent').val());
              return{  
                idagent:e.payload.child('idagent').val(),
                consigne:e.payload.child('consigne').val(),
                date:e.payload.child('date').val(),
                position:e.payload.child('position').val(),
                idplanning:e.payload.child('idplanning').val(),
                presence:e.payload.child('presence').val(),
                vue:e.payload.child('vue').val(),
                status:"ok"
                  }
              }
              else{
                return{  
                  idagent:e.payload.child('idagent').val(),
                  consigne:e.payload.child('consigne').val(),
                  date:e.payload.child('date').val(),
                  position:e.payload.child('position').val(),
                  idplanning:e.payload.child('idplanning').val(),
                  presence:e.payload.child('presence').val(),
                  vue:e.payload.child('vue').val(),
                    }                
              }
      
          });
          var agentcu = this.agent.filter(function (v) {
            return (v.status == "ok");
          });
          this.agentcust=agentcu;
        },
        err => {console.log("erreur de :" + err);
        })
     
  }
}
