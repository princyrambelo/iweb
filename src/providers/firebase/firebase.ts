import { Injectable } from '@angular/core';
// import { LoadingController, ToastController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
@Injectable()
export class FirebaseProvider {
  public static CUSTOMER_REF :string ="newCustomer"
  public static ADDRESS_MAC: string ="40:45:da:45:b4:00"
  public static readonly  TYPE_PRINT_FLASH = "FLASH";
  public static readonly  TYPE_PRINT_REGISTER = "REGISTER";

  constructor(private firebase: AngularFireDatabase,
 // 	private loadingCtrl: LoadingController,
    private af: AngularFireDatabase,
   // private toastCtrl: ToastController,
    //private alertCtrl: AlertController
  	) {
  }
  reportingList: AngularFireList<any> = this.firebase.list('repporting');
  planningList : AngularFireList<any> = this.firebase.list('planning');
  getutilisateur : AngularFireList<any> = this.firebase.list('utilisateur');
  getTransactionHistory() {
    return new Promise((resolve,reject) =>{
      const data: firebase.database.Reference = firebase.database().ref('utilisateur' );
      
        data.on('value', dataSnapshot =>{
          resolve(dataSnapshot.val())
        })
      })
  }
  getfire(){
    this.getutilisateur = this.firebase.list('utilisateur')
      return this.getutilisateur.snapshotChanges(); 
  }
  getplanning(){
this.planningList = this.firebase.list('planning')
    return this.planningList.snapshotChanges(); 
}
insertplanning(us,date) {
  this.planningList.push({
    consigne: us.consigne,
    date: date,
    idagent: us.idagent,
    position:us.position,
    idclient:us.client,
    presence:'false',
    status:'false',
    vue:'false'
  });
}
updateplanning(consi,date,idagent,position,client,presence,status,id) {
  this.planningList.update(id,
    {
    consigne: consi,
    date: date,
    idagent: idagent,
    position:position,
    idclient:client,
    presence:presence,
    status:status,
    vue:'true'
    })
}
  getreporting() {
    this.reportingList = this.firebase.list('repporting');
    return this.reportingList.snapshotChanges();
  }
  insertreporting(reporting,lat,long,date,id,sous) {
    this.reportingList.push({
      tittle: reporting.tittle,
      logitude: long,
      latitude: lat,
      contenu: reporting.contenu,
      idagent:id,
      idsoustraitant:sous,
      date:date,
      vue:'false'
     
    });
  }
  updaterepporting(tit,cont,date,idagent,lat,log,idsous,id) {
    this.reportingList.update(id,
      {
        tittle: tit,
        logitude: log,
        latitude: lat,
        contenu: cont,
        idagent:idagent,
        idsoustraitant:idsous,
        date:date,
        vue:'true'
      })
  }
  deleteusers(ey) {
    this.getutilisateur.remove(ey);
  }
  updateusers(user,id) {
    this.getutilisateur.update(id,
      {
        idagent:user.id,
        nomagent: user.nom,
        prenomagent: user.prenom,
        datenaisance: user.date,
        type: user.type,
        login:user.login,
        mdp:user.mdp
      })
  }
  insertuser(add,sous) {
    this.getutilisateur.push({
      idagent:add.idadd,
        nomagent: add.nomadd,
        prenomagent: add.prenomadd,
        datenaisance: add.dateadd,
        type: add.typeadd,
        login:add.loginadd,
        soustraitant:sous,
        mdp:add.mdpadd,
        adresse:add.adresse
        
    });
  }
}
