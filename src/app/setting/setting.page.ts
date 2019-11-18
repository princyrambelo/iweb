import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
// import { GoogleMaps, GoogleMap, Environment} from '@ionic-native/google-maps/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Marker,Environment
 
} from '@ionic-native/google-maps';
// import { GoogleMaps } from "@ionic-native/google-maps";
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  map: GoogleMap;
  constructor(private platform:Platform) { }
 
  async ngOnInit() {
    // You can not use the same way with ionic v3,
    // you need to wait `platform.ready()`
   await this.platform.ready();
   await this.loadMap();

  }
  loadMap() {

    // This code is necessary for browser
    // Environment.setEnv({
    //   'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAjFuCgB_CTc37RLhOWxCYZK8XtzHljqEk',
    //   'API_KEY_FOR_BROWSER_DEBUG':'AIzaSyC8L7mUrIfBZLbMEcgRepsTF_SV4gxWu-w'
    // });

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }
  
}
