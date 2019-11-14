import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as L from 'leaflet';
import { FirebaseProvider } from 'src/providers/firebase/firebase';
import { GestionagentPageModule } from '../gestionagent/gestionagent.module';
declare var google: any;
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  d:boolean;
   @ViewChild("map", { static: true }) mapRef: ElementRef;
  map:any;
  idsous:any;
  image:any;
  reporting:any;
  agent1:boolean=true;
  users:any;
  user:any;
  ajoutselect:boolean;
  soustraitant:boolean;
  client:boolean;
  markersArray = [];
  constructor(   public storage: Storage,public fire: FirebaseProvider) {
  }
  ngOnInit() {
    this.getutilisateur();
    this.googlemap();
  }
  
    googlemap(){
      const location =new google.maps.LatLng(-18.8830062,47.5420886);
      this.map = new google.maps.Map(document.getElementById('map'),{
        zoom: 10,
        center:  location
      });  
    }
  getutilisateur(){
    this.storage.get('idagent').then((sessionrepport: any) => {  this.fire.getfire().subscribe(data => {
      this.users =data.map(e=> {
        return{
          k:e.key,
          idagent:e.payload.child('idagent').val(),
          nomagent:e.payload.child('nomagent').val(),
          prenomagent:e.payload.child('prenomagent').val(),
          login:e.payload.child('login').val(),
          datenaissance:e.payload.child('datenaisance').val(),
          mdp:e.payload.child('mdp').val(),
          type:e.payload.child('type').val(),
          idsoustraitant:e.payload.child('soustraitant').val(),
        }
      
      });
      var agent = this.users.filter(function (v) {
        return (v.idsoustraitant == sessionrepport);
      });
      this.user= agent;
    },
    err => {console.log("erreur de :" + err);
    });
    }).catch(() => {
    });
  }
  selection(us){
    this.storage.get('idagent').then((sessionrepport1: any) => {  

      this.googlemap();

    this.fire.getreporting().subscribe(data => {
      this.reporting =data.map(e=> {
        return{
          k:e.key,
          contenu:e.payload.child('contenu').val(),
          date:e.payload.child('date').val(),
          idagent:e.payload.child('idagent').val(),
          latitude:e.payload.child('latitude').val(),
          longitude:e.payload.child('logitude').val(),
          titre:e.payload.child('tittle').val(),
          idsoustraitant:e.payload.child('idsoustraitant').val(),
        }
      
      });
      for (let index = 0; index < this.reporting.length; index++) {
        if((this.reporting[index].idagent==us) && (this.reporting[index].idsoustraitant==sessionrepport1)){
        const location1 =new google.maps.LatLng(this.reporting[index].latitude,this.reporting[index].longitude);
        this.markersArray = new google.maps.Marker({
          title: 'Identifiant agent: '+this.reporting[index].idagent+', reporting: '+this.reporting[index].titre+', Contenu: '+this.reporting[index].contenu+'',
          map: this.map,
          animation: google.maps.Animation.DROP,
          target:'Localisation:',
              position: location1


            });
         
          
         
      }
    }
    },
    err => {console.log("erreur de :" + err);
    });

    }).catch(() => {
    });

    
   
  
  }
  fermer(){
    this.ajoutselect=false;
  }
}
