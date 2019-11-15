import { Component,OnInit } from '@angular/core';
// import {Page, Storage, LocalStorage} from 'ionic-angular';
import { ActivatedRoute } from '@angular/router';
 import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseProvider } from 'src/providers/firebase/firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { InvoicePrint } from 'src/lib/models/invoicePrint'
import { Router } from '@angular/router';

// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
//import { IonicPage, NavController } from 'ionic-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  
})
export class AppComponent  implements OnInit {
  connect:boolean;
  agent1:boolean;
  soustraitant:boolean;
  client:boolean;
  form : FormGroup;
  connect1:boolean;
  agent:any;
  showMessagemdp:boolean;
  showMessageerrervide:boolean;
  showMessageerrer:boolean;
  rep:any;
  encodedData = '';
  QRSCANNED_DATA: string;
  isOn = false;
  scannedData: {};
  facture: InvoicePrint  = new InvoicePrint();
  constructor(
    //  private qrScanCtrl: QRScanner,
    private router: Router,
  private storage: Storage, 
    private activatedRoute: ActivatedRoute,
      private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public formBuilder : FormBuilder, 
    public fire: FirebaseProvider
  ) {
  
    this.form = formBuilder.group({
      login: ['', Validators.required],
      password: ['',Validators.required],
    });
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

   });
  }
  ngOnInit() {
    
  }
  // goToQrScan() {
  //   this.qrScanCtrl.prepare()
  //     .then((status: QRScannerStatus) => {
  //       if (status.authorized) {
  //         // camera permission was granted
  //         this.isOn = true;


  //         // start scanning
  //         const scanSub = this.qrScanCtrl.scan().subscribe((text: string) => {
  //           console.log('Scanned something', text);
  //           this.isOn = false;

  //           this.QRSCANNED_DATA = text;
  //           if (this.QRSCANNED_DATA !== '') {
  //             this.closeScanner();
  //             scanSub.unsubscribe();
  //           }

  //         });
  //         this.qrScanCtrl.show();

  //       } else if (status.denied) {
  //         console.log('camera permission denied');
  //         this.qrScanCtrl.openSettings();
  //       } else {
  //       }
  //     })
  //     .catch((e: any) => console.log('Error is', e));
  // }
  // closeScanner() {
  //   this.isOn = false;
  //   this.qrScanCtrl.hide();
  //   this.qrScanCtrl.destroy();
  // }
  initializeApp() {
    //this.navCtrl.setRoot('planning');
    // this.platform.ready().then(() => {
    //   this.statusBar.styleDefault();
    //   this.splashScreen.hide();
    // });
  }
  accueil(){
    this.router.navigate(['tabs/tab1']);
  }
  public deconnexion()
  {
    localStorage.removeItem('login');
    localStorage.removeItem('name');
    localStorage.removeItem('mdp');
    localStorage.removeItem('type');
    localStorage.removeItem('idagent');
    this.form.reset();
    this.router.navigate(['tabs/tab1'])
    setTimeout(function(){
      window.location.reload(); }, 1000);
   

  }
  public login(value) {
    localStorage.removeItem('login');
    localStorage.removeItem('name');
    localStorage.removeItem('mdp');
    localStorage.removeItem('type');
    localStorage.removeItem('idagent');
    this.showMessagemdp=false;
    this.showMessageerrer=false;
    this.showMessageerrervide=false;
    if (this.form.valid) {
      this.fire.getfire().subscribe(data => {
        this.agent=data.map(e=> {
          return{
            idagent:e.payload.child('idagent').val(),
            nomagent:e.payload.child('nomagent').val(),
            prenomagent:e.payload.child('prenomagent').val(),
            login:e.payload.child('login').val(),
            datenaissance:e.payload.child('datenaissance').val(),
            mdp:e.payload.child('mdp').val(),
            type:e.payload.child('type').val(),
          }
        
        });
        // console.log(this.agent);
     
        for (let index = 0; index < this.agent.length; index++) {
          if ((this.agent[index].login ==value.login)&&(this.agent[index].mdp==value.password)){
            this.storage.set('login', this.agent[index].idagent).then(() => {});
            this.storage.set('type', this.agent[index].type).then(() => {});
             this.storage.set('idagent', this.agent[index].idagent).then(() => {});
             this.storage.set('soustraitant', this.agent[index].soustraitant).then(() => {});
             if(this.agent[index].type=="agent"){
                  this.agent1=true;
                  this.soustraitant=false;
                  this.client=false;
                }
                if(this.agent[index].type=="soustraitant"){
                  this.agent1=false;
                  this.soustraitant=true;
                  this.client=false;
                }
                if(this.agent[index].type=="client"){
                  this.agent1=false;
                  this.soustraitant=false;
                  this.client=true;
                }
           this.connect1=true;
            
            }
          }
     if( this.connect1==true){
      this.connect=true
     }else{
      this.showMessageerrervide=true;
     }
       
      },
      err => {console.log("erreur de :" + err);
      this.showMessageerrer=true;
      }
      )

      
    } else {
      console.log("erreur");
      this.showMessageerrervide=true;
    }
  }
 

  public getagent(){
    this.fire.getfire().subscribe(data => {
      this.agent=data.map(e=> {
        return{
          idagent:e.payload.child('idagent').val(),
          nomagent:e.payload.child('nomagent').val(),
          prenomagent:e.payload.child('prenomagent').val(),
          login:e.payload.child('login').val(),
          datenaissance:e.payload.child('datenaissance').val(),
          mdp:e.payload.child('mdp').val(),
          type:e.payload.child('type').val(),
        }
      
      });
      console.log(this.agent);
    },
    err => console.log("erreur de :" + err)
  )      
  
  }
  // public qrcode(){
  //   this.qrScanner.prepare()
  // .then((status: QRScannerStatus) => {
  //    if (status.authorized) {
  //      // camera permission was granted


  //      // start scanning
  //      let scanSub = this.qrScanner.scan().subscribe((text: string) => {
  //        console.log('Scanned something', text);

  //        this.qrScanner.hide(); // hide camera preview
  //        scanSub.unsubscribe(); // stop scanning
  //      });

  //    } else if (status.denied) {
  //      // camera permission was permanently denied
  //      // you must use QRScanner.openSettings() method to guide the user to the settings page
  //      // then they can grant the permission from there
  //    } else {
  //      // permission was denied, but not permanently. You can ask for permission again at a later time.
  //    }
  // })
  // .catch((e: any) => console.log('Error is', e));
  // }
}
