import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { JsonSaverService } from 'src/app/services/json-saver.service';
import { LocalStorageService, LocalStorageKey } from '../../../services/local-storage.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  environnements : string[] = [];

  frequenceGlobaleVisite : FormControl = new FormControl(0, Validators.min(0));
  environnementType : FormControl = new FormControl();

  constructor(
    private jsonService : JsonSaverService,
    private localStorageService : LocalStorageService
  ) { }

  ngOnInit() {
    this.initEnvironnementsEtFrequenceGlobale();
    
    //Ecoute les changement de valeur sur le champ de la fréquence globale de visite
    this.frequenceGlobaleVisite.valueChanges.subscribe(nouvelleValeur =>{
      if(this.frequenceGlobaleVisite.valid){
        this.localStorageService.setItem(LocalStorageKey.FrequenceGlobaleVisite, nouvelleValeur);
      }
    })
  }

  initEnvironnementsEtFrequenceGlobale(){
    let frequence = this.localStorageService.getItem(LocalStorageKey.FrequenceGlobaleVisite);
    let environnements =  this.localStorageService.getItem(LocalStorageKey.Environnements);

    this.frequenceGlobaleVisite.setValue(frequence ? frequence : '');
    this.environnements = environnements ? environnements : [];
  }

  creerEnvironnement(environnement : string){
    if(environnement){
      this.environnements.push(environnement);
      this.environnementType.setValue('');

      this.localStorageService.setItem(LocalStorageKey.Environnements, this.environnements);
    }
  }

  supprimerEnvironnement(index: number){
    this.environnements.splice(index,1);
    this.localStorageService.setItem(LocalStorageKey.Environnements, this.environnements);
  }

  sauvegarderDonnees(){
    //On sauvegarde tout le localStorage
    this.jsonService.sauvegarderObjEnFichierJson(localStorage, 'sauvegardeAppiculture');
  }


  /** Lorsque qu'un fichier est sélectionné */
  fichierChoisis(event){
    if(event.target.files && event.target.files.length >0){
      let fichier : File = event.target.files[0];

      //On récupère le contenu json du fichier
      this.jsonService.getJsonAvecFile(fichier).then(json => {
        //On charge toutes les données du fichier json dans le localStorage
        this.localStorageService.setAllAvecJson(json);

        //On réinitialise les variables actuelles de la fréquence globale de visite et la liste d'environnements type
        this.initEnvironnementsEtFrequenceGlobale();
      })
      
    }
  }

 

}
