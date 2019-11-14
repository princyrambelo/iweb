import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FirebaseProvider } from 'src/providers/firebase/firebase';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { modalController } from '@ionic/core';
@Component({
  selector: 'app-gestionagent',
  templateUrl: './gestionagent.page.html',
  styleUrls: ['./gestionagent.page.scss'],
})
export class GestionagentPage implements OnInit{
  formupdate : FormGroup;
  formadd : FormGroup;
  agent1gestion:boolean;
  showMessageModif:boolean;
  ke:any;
  idsous:any;
  id:any;
  mdp:any;
  user:any;
  nom:any;
  prenom:any;
  date:any;
  login:any;
  type:any;
  ajout1:boolean=false;
  modifi:boolean;
  soustraitantgestion:boolean;
  clientgestion:boolean;
  users:any;
  showDeleteMessage:boolean;
  constructor(  private router: Router, public formBuilder : FormBuilder,public storage: Storage, public fire: FirebaseProvider) {
   
    this.formupdate = formBuilder.group({
      ke: ['',Validators.required],
      id: ['',Validators.required],
      login: ['',Validators.required],
      date: ['',Validators.required],
      prenom: ['',Validators.required],
      nom: ['',Validators.required],
      type: ['',Validators.required],
      mdp: ['',Validators.required],
    });
    this.formadd = formBuilder.group({
      keadd: ['',Validators.required],
      idadd: ['',Validators.required],
      loginadd: ['',Validators.required],
      dateadd: ['',Validators.required],
      prenomadd: ['',Validators.required],
      nomadd: ['',Validators.required],
      typeadd: ['',Validators.required],
      mdpadd: ['',Validators.required],
    });
   }
  ngOnInit() {
    this.init(); this.getutilisateur();
  }
  add(add){
    this.fire.insertuser(add);
  }
  ajout(){
    this.ajout1=true;
  }
  fermer() {
    this.modifi=false;
    this.ajout1=false;
  }
  modif(ke,id,nomagent,prenomagent,login,datenaissance,type,mdp){
    this.ke=ke;
    this.id=id;
    this.nom=nomagent;
    this.prenom=prenomagent;
    this.login=login;
    this.date=datenaissance;
    this.type=type;
    this.mdp=mdp;
    this.modifi=true;

  }
  init(){ this.storage.get('type').then((sessiongestion: any) => { 
    if(sessiongestion=="agent"){
      this.agent1gestion=true;
      this.soustraitantgestion=false;
      this.clientgestion=false;
    }
    if(sessiongestion=="soustraitant"){
      this.agent1gestion=false;
      this.soustraitantgestion=true;
      this.clientgestion=false;
    }
    if(sessiongestion=="client"){
      this.agent1gestion=false;
      this.soustraitantgestion=false;
      this.clientgestion=true;
    }
  }).catch(() => {
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
deleteuser(us){
  this.fire.deleteusers(us);
}
logForm(us){
  //  if(this.formupdate.valid){ 
    console.log(this.ke);
    var ident=this.ke;
    this.fire.updateusers(us,ident);
    this.modifi=false;
  setTimeout(()=>this.showMessageModif=false, 3000);
  this.showMessageModif=true
  //  }
}

}
