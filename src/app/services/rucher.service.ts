import { Injectable } from '@angular/core';
import { Rucher } from '../models/dataAppiculture.model';
import { LocalStorageService, LocalStorageKey } from './local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RucherService {

  ruchers : Rucher[] = [];
  environnements : string[] = [];
  frequenceGlobaleVisite : number;

  changementPositionEnCours : boolean = false;

  constructor(
    private localStorageService : LocalStorageService,
    private router : Router,
    private route : ActivatedRoute
  ) { 
    this.initDatas();
    console.log("Rucher service, données récupérées");
  }

  /** Initialise toutes les données du service à partir du local storage */
  initDatas(){
    let ruchers = this.localStorageService.getItem(LocalStorageKey.Ruchers);
    let environnements = this.localStorageService.getItem(LocalStorageKey.Environnements);
    let frequence = this.localStorageService.getItem(LocalStorageKey.FrequenceGlobaleVisite);

    this.environnements = environnements ? environnements : [];
    this.ruchers = ruchers ? ruchers : [];
    this.frequenceGlobaleVisite = frequence ? frequence : 0;
  }

  /** Permet de sauvegarder un objet json dans le localStorage et de charger ces données dans le service */
  initLocalStorageEtDatasAvecJson(json : any){
    //On charge toutes les données du l'objet json dans le localStorage
    this.localStorageService.setAllAvecJson(json);

    //On réinitialise les données du service à partir du localStorage 
    this.initDatas();
  }

  /** Permet de sauvegarder les `ruchers` présents dans le service dans le local storage  */
  sauvegarderRuchers(){
    this.localStorageService.setItem(LocalStorageKey.Ruchers, this.ruchers);
  }

  /** Permet de sauvegarder les `environnements` présents dans le service dans le local storage  */
  sauvegarderEnvironnements(){
    this.localStorageService.setItem(LocalStorageKey.Environnements, this.environnements);
  }

  /** Permet de sauvegarder la `frequenceGlobaleVisite` présente dans le service dans le local storage  */
  sauvegarderFrequenceGlobaleVisite(){
    this.localStorageService.setItem(LocalStorageKey.FrequenceGlobaleVisite, this.frequenceGlobaleVisite);
  }

  /** Retourne un rucher parmi la liste des `ruchers`, s'il n'est pas trouvé on navigue sur la liste des ruchers  */
  getRucherAvecIdentifiant(identifiant : string) : Rucher | undefined {
    let rucherExistant = this.ruchers.find(rucher => rucher.identifiant == identifiant);
    
    if(rucherExistant){
      return rucherExistant;
    }else{
      this.router.navigate(['/front/liste-ruchers']);
    }
  }

  getJourEcouleDerniereVisiteRucher(rucher : Rucher) : number{
    let derniereVisite : Date;
    if(rucher.visites.length == 0){
      derniereVisite = rucher.dateCreation;
    }else{
      derniereVisite = rucher.visites[0].date;
    }

    return moment().diff(new Date(derniereVisite), 'days');
  }

  getCouleurSelonRucher(rucher : Rucher) : 'red' | 'orange' | 'lightgreen' {
    let frequenceVisite = rucher.frequenceVisite ? rucher.frequenceVisite : this.frequenceGlobaleVisite;
  
    let joursEcoules = this.getJourEcouleDerniereVisiteRucher(rucher);
  
    if(joursEcoules > frequenceVisite){
      return "red";
    }else if(joursEcoules >= frequenceVisite/2){
      return "orange";
    }else{
      return "lightgreen";
    }
  }
  

  setPositionRucher(rucher : Rucher) : Promise<any> {
    this.changementPositionEnCours = true;
    return new Promise(resolve =>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=> {
          rucher.position = { latitude : position.coords.latitude, longitude : position.coords.longitude };
          resolve()
        }, () => {
          rucher.position = null;
          resolve()
        });
      }else{
        resolve()
      }
    }).then(() => {
      this.sauvegarderRuchers();
      this.changementPositionEnCours = false;
      return true;
    });
  }
}
