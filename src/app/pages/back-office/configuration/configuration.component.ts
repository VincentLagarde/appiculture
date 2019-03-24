import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { JsonSaverService } from 'src/app/services/json-saver.service';
import { LocalStorageService, LocalStorageKey } from '../../../services/local-storage.service';
import { RucherService } from 'src/app/services/rucher.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  frequenceGlobaleVisiteForm : FormControl = new FormControl(0, Validators.min(0));
  environnementType : FormControl = new FormControl();

  constructor(
    private jsonService : JsonSaverService,
    public rucherService : RucherService
  ) { }

  ngOnInit() {
    this.initFrequenceGlobale();
    
    //Ecoute les changement de valeur sur le champ de la fréquence globale de visite
    this.frequenceGlobaleVisiteForm.valueChanges.subscribe(nouvelleValeur =>{
      if(this.frequenceGlobaleVisiteForm.valid){
        this.rucherService.frequenceGlobaleVisite = nouvelleValeur;
        this.rucherService.sauvegarderFrequenceGlobaleVisite();
      }
    })
  }

  initFrequenceGlobale(){
    this.frequenceGlobaleVisiteForm.setValue(this.rucherService.frequenceGlobaleVisite);
  }

  creerEnvironnement(environnement : string){
    if(environnement){
      this.rucherService.environnements.push(environnement);
      this.rucherService.sauvegarderEnvironnements();

      this.environnementType.setValue('');//Reinitilise le champs
    }
  }

  supprimerEnvironnement(index: number){
    this.rucherService.environnements.splice(index,1);
    this.rucherService.sauvegarderEnvironnements();
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
        //puis on charge les données du localStorage dans le service principal
        this.rucherService.initLocalStorageEtDatasAvecJson(json);
       
        //On réinitialise le champs de fréquence globale de visite
        this.initFrequenceGlobale();
      })
      
    }
  }

 

}
