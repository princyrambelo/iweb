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
  getreporting() {
    this.reportingList = this.firebase.list('repporting');
    return this.reportingList.snapshotChanges();
  }
  insertreporting(reporting,lat,long,date,id) {
    this.reportingList.push({
      tittle: reporting.tittle,
      logitude: long,
      latitude: lat,
      contenu: reporting.contenu,
      idagent:id,
      date:date
    });
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
  insertuser(add) {
    this.getutilisateur.push({
      idagent:add.idadd,
        nomagent: add.nomadd,
        prenomagent: add.prenomadd,
        datenaisance: add.dateadd,
        type: add.typeadd,
        login:add.loginadd,
        mdp:add.mdpadd
    });
  }
}
