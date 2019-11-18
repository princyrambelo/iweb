import { Component, OnInit } from '@angular/core';
import { FirebaseProvider } from 'src/providers/firebase/firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
@Component({
  selector: 'app-assigne',
  templateUrl: './assigne.page.html',
  styleUrls: ['./assigne.page.scss'],
})
export class AssignePage implements OnInit {
  formplanning : FormGroup;
  today:any;
  clients:any;
  showMessagesucces:boolean;
  showMessagesucceserror:boolean;
  users:any;
  user:any;
  constructor( public storage: Storage, public formBuilder : FormBuilder,  public fire: FirebaseProvider) { this.formplanning = formBuilder.group({
    consigne: ['',Validators.required],
    idagent: ['',Validators.required],
    position: ['',Validators.required],
    client: ['',Validators.required],
  });}

  ngOnInit() {
    this.getutilisateur();
  }
  envoieplanning(us){
    if(this.formplanning.valid){
      let d = new Date()
        let today = moment(d).format("DD-MM-YYYY A hh:mm");
    this.fire.insertplanning(us,today);
    this.showMessagesucces=true;
    setTimeout(()=> this.showMessagesucces=false , 3000);
    }
    else{
      this.showMessagesucceserror=true;
      setTimeout(()=> this.showMessagesucceserror=false , 3000);
    }
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

      var client = this.users.filter(function (v) {
        return (v.type == "client");
      });
      this.clients= client;
    },
    err => {console.log("erreur de :" + err);
    });
    }).catch(() => {
    });
    
  }
}
