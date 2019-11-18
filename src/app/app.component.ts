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
import { Tab3Page } from './tab3/tab3.page';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';
// import { FCM } from '@ionic-native/fcm/ngx';

// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
//import { IonicPage, NavController } from 'ionic-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  
})
export class AppComponent  implements OnInit {
  notif:boolean;
  i:any;
  j:any;
  nbplan:any;
  nbrep:any;
  planning:any;
  planningcust:any='';
  repport:any;
  agenttest:boolean;
  soustest:boolean;
  repportcust:any='';
  connect:boolean;
  rootPage: any;
  agent1:boolean;
  visi:boolean;
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
    private toastController: ToastController,
    // private fcm: FCM,
    //  private qrScanCtrl: QRScanner,
    private router: Router,
  private storage: Storage, 
    private activatedRoute: ActivatedRoute,
      private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public formBuilder : FormBuilder, 
    public fire: FirebaseProvider
    // ,private localNotifications: LocalNotifications
  ) {
   
    this.form = formBuilder.group({
      login: ['', Validators.required],
      password: ['',Validators.required],
    });
    this.platform.ready().then(() => {
      this.rootPage = Tab3Page;
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }
  ngOnInit() {
   
  }
 
  // async showToast() {
  //   const toast = await this.toastController.create({
  //     message: 'Mmmm, buttered toast',
  //     duration: 1000,
  //     position: 'bottom',
  //   });
  //   toast.present();
  // }
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
  but(){
    this.visi=true;
  }
  initializeApp() {
    //this.navCtrl.setRoot('planning');
    // this.platform.ready().then(() => {
    //   this.statusBar.styleDefault();
    //   this.splashScreen.hide();
    // });
    

  }
  accueil(){
    this.visi=false;
    this.router.navigate(['tabs/tab1']);
  }
  public deconnexion()
  {
    localStorage.removeItem('login');
    localStorage.removeItem('name');
    localStorage.removeItem('mdp');
    localStorage.removeItem('type');
    localStorage.removeItem('idagent');
    localStorage.removeItem('soustraitant');
    this.form.reset();
    this.router.navigate([''])
    setTimeout(function(){
      window.location.reload(); }, 1000);
   

  }
  public login(value) {
    // this.localNotifications.schedule({
    //   id: 1,
    //   text: 'Single ILocalNotification',
    //   // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
    //   // data: { secret: key }
    // });
    localStorage.removeItem('login');
    localStorage.removeItem('name');
    localStorage.removeItem('mdp');
    localStorage.removeItem('type');
    localStorage.removeItem('idagent');
    localStorage.removeItem('soustraitant');
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
            soustraitant:e.payload.child('soustraitant').val(),
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
                this.getplanning(this.agent[index].type,this.agent[index].idagent);
                this.getrepporting(this.agent[index].type,this.agent[index].idagent);
           this.connect1=true;
            
            }
          }
     if( this.connect1==true){
      this.connect=true
     }else{
      this.showMessageerrervide=true;
      setTimeout(()=> this.showMessageerrervide=false , 3000);
     }
       
      },
      err => {console.log("erreur de :" + err);
      this.showMessageerrer=true;
      setTimeout(()=> this.showMessageerrer=false , 3000);
      }
      )

      
    } else {
      console.log("erreur");
      this.showMessageerrervide=true;
      setTimeout(()=> this.showMessageerrervide=false , 3000);
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
  async showToastWithCloseButton(data) {

          
        const toast = await this.toastController.create({
          message: data,
          showCloseButton: true,
          closeButtonText: 'Ok',
          // duration: 4000,
        position: 'top',
          color:'primary',
          cssClass:'toast-bg'
        });
        toast.present();
  }
  public getplanning(type,id){
      if(type=="agent"){
    this.j=0;
    this.notif=false;
    this.fire.getplanning().subscribe(data => {
      this.planning=data.map(e=> {
      // let d = new Date();
      // let today = moment(d).format("DD-MM-YYYY A hh:mm");
  
        if (id== e.payload.child('idagent').val()){
         
            if (e.payload.child('vue').val()==="false"){
              this.notif=true;
              this.j++;
              return{
                k:e.key,
                idagent:e.payload.child('idagent').val(),
                date:e.payload.child('date').val(),
                consigne:e.payload.child('consigne').val(),
                position:e.payload.child('position').val(),
                presence:e.payload.child('presence').val(),
                idclient:e.payload.child('idclient').val(),
                status:e.payload.child('status').val(),
                tempp: "ok"
              }
            } 
            else{
              return{
                k:e.key,
                idagent:e.payload.child('idagent').val(),
                date:e.payload.child('date').val(),
                consigne:e.payload.child('consigne').val(),
                position:e.payload.child('position').val(),
                presence:e.payload.child('presence').val(),
                idclient:e.payload.child('idclient').val(),
                status:e.payload.child('status').val(),
                tempp: "ko"
              }
            }
           
      } 
      else{
        return{
          k:e.key,
          idagent:e.payload.child('idagent').val(),
          date:e.payload.child('date').val(),
          consigne:e.payload.child('consigne').val(),
          position:e.payload.child('position').val(),
          presence:e.payload.child('presence').val(),
          idclient:e.payload.child('idclient').val(),
          status:e.payload.child('status').val(),
          tempp: "ko"
        }
      }
  });
  var planning1 = this.planning.filter(function (v) {
    return (v.tempp == "ok");
  });
  if(planning1.length==''){
    this.notif=false;
  }
  this.planningcust= planning1;
  this.nbplan=this.planningcust.length ;
},
err => {})
      }
}
public getrepporting(type,id){
    if(type=="soustraitant"){
            this.i=0;
            this.notif=false;

          this.fire.getreporting().subscribe(datarep => {
           this.repport=datarep.map(erep=> {
       
              if (id== erep.payload.child('idsoustraitant').val()){
                  if (erep.payload.child('vue').val()==="false"){
                    this.notif=true;
                    this.i++;
                    return{
                      k:erep.key,
                      idagent:erep.payload.child('idagent').val(),
                      tittle:erep.payload.child('tittle').val(),
                      date:erep.payload.child('date').val(),
                      contenu:erep.payload.child('contenu').val(),
                      latitude:erep.payload.child('latitude').val(),
                      logitude:erep.payload.child('logitude').val(),
                      idclient:erep.payload.child('idclient').val(),
                      idsoustraitant:erep.payload.child('idsoustraitant').val(),
                      tempp: "ok"
                    }
                  }
                  else{
                    return{
                      k:erep.key,
                      idagent:erep.payload.child('idagent').val(),
                      tittle:erep.payload.child('tittle').val(),
                      date:erep.payload.child('date').val(),
                      contenu:erep.payload.child('contenu').val(),
                      latitude:erep.payload.child('latitude').val(),
                      logitude:erep.payload.child('logitude').val(),
                      idclient:erep.payload.child('idclient').val(),
                      idsoustraitant:erep.payload.child('idsoustraitant').val(),
                      tempp: "ko"
                    }
                  }
            } 
            else{
              return{
                k:erep.key,
                idagent:erep.payload.child('idagent').val(),
                tittle:erep.payload.child('tittle').val(),
                date:erep.payload.child('date').val(),
                contenu:erep.payload.child('contenu').val(),
                latitude:erep.payload.child('latitude').val(),
                logitude:erep.payload.child('logitude').val(),
                idclient:erep.payload.child('idclient').val(),
                idsoustraitant:erep.payload.child('idsoustraitant').val(),
                tempp: "ko"
              }
            }
             
          });
          var repport1 = this.repport.filter(function (v) {
            return (v.tempp == "ok");
          });
          if(repport1.length==''){
            this.notif=false;
          }
          this.repportcust= repport1;
          this.nbrep=this.repportcust.length ;
          },
          err => {})
        }
}
shownotif(data){
  console.log('nb'+this.planningcust);
  console.log('nb'+this.planning);
        this.i=0;
        this.notif=false;
         for (let index = 0; index < data.length; index++) {
            this.showToastWithCloseButton('REPPORTING: Contenu: '+ data[index].contenu +' , Idagent: '+ data[index].idagent + ' , Date: '+ data[index].date + ' , Titre: '+ data[index].tittle);
            this.fire.updaterepporting(data[index].tittle,data[index].contenu,data[index].date,data[index].idagent,data[index].latitude,data[index].logitude,data[index].idsoustraitant,data[index].k);      
        }
}
shownotifplan(data){
  console.log(this.planningcust);
  console.log(this.planning);
              this.j=0;
              this.notif=false;
              for (let index = 0; index < data.length; index++) {
                this.showToastWithCloseButton('PLANNING: Consigne: '+ data[index].consigne +' , Adresse: '+ data[index].position + data[index].date + ' , Date: '+ data[index].date );
                this.fire.updateplanning(data[index].consigne,data[index].date,data[index].idagent,data[index].position,data[index].idclient,data[index].presence,data[index].status,data[index].k);
              }
              this.notif=false;
}
}
