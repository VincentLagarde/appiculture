import { Component, OnInit } from '@angular/core';
import { Rucher } from 'src/app/models/dataAppiculture.model';
import { LocalStorageService, LocalStorageKey } from 'src/app/services/local-storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-liste-ruchers',
  templateUrl: './liste-ruchers.component.html',
  styleUrls: ['./liste-ruchers.component.scss']
})
export class ListeRuchersComponent implements OnInit {
  
  ruchers : Rucher[] = [];
  frequenceGlobaleVisite : number;


  constructor(
    private localStorageService : LocalStorageService
  ) { }

  ngOnInit() {
    this.initRuchersEtFrequence();
  }

  initRuchersEtFrequence(){
    let ruchers = this.localStorageService.getItem(LocalStorageKey.Ruchers);
    let frequence = this.localStorageService.getItem(LocalStorageKey.FrequenceGlobaleVisite);
    
    this.frequenceGlobaleVisite = frequence ? frequence : 1;
    this.ruchers = ruchers ? ruchers : [];
  }


  getCouleurSelonRucher(rucher : Rucher) : 'red' | 'orange' | 'lightgreen' {
    let frequenceVisite = rucher.frequenceVisite ? rucher.frequenceVisite : this.frequenceGlobaleVisite;
    console.log("frequence",frequenceVisite)
    
    let derniereVisite;
    if(rucher.visites.length == 0){
      derniereVisite = rucher.dateCreation;
      console.log("dateCreation")
    }else{
      console.warn("ELSE")
      derniereVisite = rucher.visites[rucher.visites.length-1];
    }

    let joursEcoules = moment().diff(derniereVisite, 'days');
    console.log("jourEcoules",joursEcoules)

    if(joursEcoules > frequenceVisite){
      return "red";
    }else if(joursEcoules >= frequenceVisite/2){
      return "orange";
    }else{
      return "lightgreen";
    }
  }

}
