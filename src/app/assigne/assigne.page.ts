import { Component, OnInit } from '@angular/core';
import { FirebaseProvider } from 'src/providers/firebase/firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-assigne',
  templateUrl: './assigne.page.html',
  styleUrls: ['./assigne.page.scss'],
})
export class AssignePage implements OnInit {
  formplanning : FormGroup;
  constructor( public storage: Storage, public formBuilder : FormBuilder,  public fire: FirebaseProvider) { this.formplanning = formBuilder.group({
    consigne: ['',Validators.required],
    idagent: ['',Validators.required],
    position: ['',Validators.required],
  });}

  ngOnInit() {
  }
  envoieplanning(){

  }
}
