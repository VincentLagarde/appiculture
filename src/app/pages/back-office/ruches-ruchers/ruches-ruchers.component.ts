import { Component, OnInit } from '@angular/core';
import { Rucher } from 'src/app/models/dataAppiculture.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService, LocalStorageKey } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-ruches-ruchers',
  templateUrl: './ruches-ruchers.component.html',
  styleUrls: ['./ruches-ruchers.component.scss']
})
export class RuchesRuchersComponent implements OnInit {
  rucherCourant : Rucher;
  ruchers : Rucher[] = [];
  environnements : string[] = [];

  formulaireRucher : FormGroup;
  afficherFormulaireRucher : boolean = false;
  changementPositionEnCours : boolean = false;

  constructor(
    private formBuilder : FormBuilder,
    private localStorageService : LocalStorageService
  ) { }

  ngOnInit() {
    this.initRuchersEtEnvironnements();

    this.initFormulaireRucher();
  }

  initRuchersEtEnvironnements(){
    let ruchers = this.localStorageService.getItem(LocalStorageKey.Ruchers);
    let environnements = this.localStorageService.getItem(LocalStorageKey.Environnements);
    this.environnements = environnements ? environnements : [];
    this.ruchers = ruchers ? ruchers : [];
  }

  initFormulaireRucher(rucher? : Rucher){
    if(rucher){
      this.formulaireRucher = this.formBuilder.group({
        identifiant : [rucher.identifiant, [Validators.required, Validators.maxLength(256)]],
        nombreRuches : [rucher.nombreRuches, [Validators.required, Validators.min(0)]],
        descriptif : [rucher.descriptif, Validators.required],
        frequenceVisite : rucher.frequenceVisite
      }); 
    }else{
      this.formulaireRucher = this.formBuilder.group({
        identifiant : ['', [Validators.required, Validators.maxLength(256)]],
        nombreRuches : [1, [Validators.required, Validators.min(0)]],
        descriptif : [this.environnements.length != 0 ? this.environnements[0] : '' , Validators.required]
      }); 
    }
  }


  async creerUnRucher(){
    //Si le formulaire est valide
    if(this.formulaireRucher.valid){
      this.afficherFormulaireRucher = false;//Cache le formulaire

      //Initialisation du rucher
      let rucher : Rucher = this.formulaireRucher.value;
      rucher.dateCreation = new Date();
      rucher.visites = [];
      rucher.frequenceVisite = null;

      //On définit la position du rucher (si c'est possible)
      //Cette fonction prendra un certain à s'effectuer et bloque l'éxécution du code
      await this.setPositionRucher(rucher);

      //On ajoute le rucher à la liste
      this.ruchers.push(rucher);
      this.localStorageService.setItem(LocalStorageKey.Ruchers, this.ruchers);

      this.initFormulaireRucher();
    }
  }

  supprimerRucher(index : number){
    this.ruchers.splice(index,1);
    this.localStorageService.setItem(LocalStorageKey.Ruchers, this.ruchers);
  }

  afficherFormulaireModificationRucher(rucher : Rucher){
    this.rucherCourant = rucher;
    this.initFormulaireRucher(rucher);
    this.afficherFormulaireRucher = true;
  }
  
  /** Permet de modifier un rucher à partir des valeurs du formulaire */
  modifierUnRucher(rucher : Rucher, rucherFormulaire : Rucher){
    if(this.formulaireRucher.valid){
      rucher.identifiant = rucherFormulaire.identifiant;
      rucher.descriptif = rucherFormulaire.descriptif;
      rucher.nombreRuches = rucherFormulaire.nombreRuches;
      rucher.frequenceVisite = rucherFormulaire.frequenceVisite;
  
      this.localStorageService.setItem(LocalStorageKey.Ruchers, this.ruchers);
     
      this.initFormulaireRucher();
      this.afficherFormulaireRucher = false;
      this.rucherCourant = null;
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
      this.changementPositionEnCours = false;
      return true;
    });
  }
}
