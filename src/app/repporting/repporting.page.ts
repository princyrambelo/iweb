import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { FirebaseProvider } from 'src/providers/firebase/firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as moment from 'moment';
@Component({
  selector: 'app-repporting',
  templateUrl: './repporting.page.html',
  styleUrls: ['./repporting.page.scss'],
})

export class RepportingPage implements OnInit {
  formreporting : FormGroup;
  today:any;
  agentid:any;
  showMessagesuccesrep:boolean;
  showMessagesucceserrorrep:boolean;
  agent1repport:boolean;
  soustraitantrepport:boolean;
  clientrepport:boolean;
  latitude: number;
  longitude: number;
  constructor(     public storage: Storage, public formBuilder : FormBuilder, public geolocation : Geolocation, public fire: FirebaseProvider) {
  
   
    this.formreporting = formBuilder.group({
      tittle: ['',Validators.required],
      contenu: ['',Validators.required],
    });
   }

  ngOnInit() {
    this.locate();
    this.init();
  }
  init(){ this.storage.get('type').then((sessionrepport: any) => {  console.log(sessionrepport);
    if(sessionrepport=="agent"){
      this.agent1repport=true;
      this.soustraitantrepport=false;
      this.clientrepport=false;
    }
    if(sessionrepport=="soustraitant"){
      this.agent1repport=false;
      this.soustraitantrepport=true;
      this.clientrepport=false;
    }
    if(sessionrepport=="client"){
      this.agent1repport=false;
      this.soustraitantrepport=false;
      this.clientrepport=true;
    }
  }).catch(() => {
  });

  this.storage.get('idagent').then((sessionid: any) => { this.agentid=sessionid }).catch(() => {
  });
}
  locate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude=resp.coords.latitude;
      this.longitude=resp.coords.longitude;
      console.log("lat" + resp.coords.latitude + "- long" + resp.coords.longitude)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  } 

 
  envoie(value){
    this.storage.get('soustraitant').then((sessionid: any) => {  console.log(sessionid);
      if(this.formreporting.valid){
        let d = new Date()
        let today = moment(d).format("DD-MM-YYYY A hh:mm");
      this.fire.insertreporting(value, this.latitude, this.longitude,today,this.agentid,sessionid);
      this.showMessagesuccesrep=true;
      setTimeout(()=> this.showMessagesuccesrep=false , 3000);
      }
      else{
        this.showMessagesucceserrorrep=true;
        setTimeout(()=> this.showMessagesucceserrorrep=false , 3000);
      }
    }).catch(() => {
    });
   
  }

//AIzaSyCU3xdLv4dIUEuBdl8H5-76iqQ-QxUnjj8 
//android key AIzaSyCU3xdLv4dIUEuBdl8H5-76iqQ-QxUnjj8
//server key AIzaSyBfH9P793sxkNogXsQl8TTTMEGickd_e8A
//brower AIzaSyAjFuCgB_CTc37RLhOWxCYZK8XtzHljqEk

//keynew AIzaSyC8L7mUrIfBZLbMEcgRepsTF_SV4gxWu-w
//AIzaSyC8L7mUrIfBZLbMEcgRepsTF_SV4gxWu-w 
}