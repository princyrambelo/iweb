import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as L from 'leaflet';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseProvider } from 'src/providers/firebase/firebase';
import { GestionagentPageModule } from '../gestionagent/gestionagent.module';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Marker,Environment
 
} from '@ionic-native/google-maps';
// declare var google: any;
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
 
  map: GoogleMap;
  d:boolean;
  //  @ViewChild("map", { static: true }) mapRef: ElementRef;
  // map:any;
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
  constructor(    private toastController: ToastController, private splashScreen: SplashScreen,
    private statusBar: StatusBar,private platform:Platform, public storage: Storage,public fire: FirebaseProvider,private router: Router) {
    
  }
  async ngOnInit() {
    // You can not use the same way with ionic v3,
    // you need to wait `platform.ready()`
  //  await this.platform.ready();
   await this.loadMap();
   this.getutilisateur();
   console.log(this.router.url)
  //  this.googlemap();
  //  this.loadMap();
  }
 
  // ngOnInit() {
  //   this.getutilisateur();
  //   this.googlemap();
  // }
  
    // googlemap(){
    //   const location =new google.maps.LatLng(-18.8830062,47.5420886);
    //   this.map = new google.maps.Map(document.getElementById('map'),{
    //     zoom: 10,
    //     center:  location
    //   });  
    // }
    loadMap() {

      // This code is necessary for browser
      // Environment.setEnv({
      //   'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAjFuCgB_CTc37RLhOWxCYZK8XtzHljqEk',
      //   'API_KEY_FOR_BROWSER_DEBUG':'AIzaSyC8L7mUrIfBZLbMEcgRepsTF_SV4gxWu-w'
      // });
  
      let mapOptions: GoogleMapOptions = {
        camera: {
           target: {
             lat: -18.8830062,
             lng: 47.5420886
           },
           zoom: 10,
           tilt: 30
         }
      };
  
      this.map = GoogleMaps.create('map_canvasrep', mapOptions);
  
      // let marker: Marker = this.map.addMarkerSync({
      //   title: 'Ionic',
      //   icon: 'blue',
      //   animation: 'DROP',
      //   position: {
      //     lat: 43.0741904,
      //     lng: -89.3809802
      //   }
      // });
      // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      //   alert('clicked');
      // });
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
      this.map.clear().then(() => {
        // alert("completed");
      });
      // this.googlemap();

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


      
          let marker: Marker = this.map.addMarkerSync({
        title: 'Identifiant agent: '+this.reporting[index].idagent+', reporting: '+this.reporting[index].titre+', Contenu: '+this.reporting[index].contenu+'',
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: this.reporting[index].latitude,
          lng: this.reporting[index].longitude
        }
      });
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
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
  // remove(){
  //   markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe((params: any[]) => {
  //     // let position: ILatLng = params[0];
  //     let marker: Marker = params[1];
  //     marker.remove();
  //   });
  // }
}
