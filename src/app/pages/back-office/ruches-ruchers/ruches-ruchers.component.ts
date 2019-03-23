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
  creationEnCours : boolean = false;

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
      this.creationEnCours = true;//Message d'attente (car la mise à jour de la position prend un certain temps)

      //Initialisation du rucher
      let rucher : Rucher = this.formulaireRucher.value;
      rucher.dateCreation = new Date();
      rucher.historiqueVisite = [];
      rucher.frequenceVisite = null;

      
      //On définit la position du rucher (si c'est possible)
      //Cette fonction prendra un certain à s'effectuer et bloque l'éxécution du code
      await this.setPositionRucher(rucher);

      //On ajoute le rucher à la liste
      this.ruchers.push(rucher);
      this.localStorageService.setItem(LocalStorageKey.Ruchers, this.ruchers);

      this.creationEnCours = false;
      this.initFormulaireRucher();
    }
  }

  supprimerRucher(index : number){
    this.ruchers.splice(index,1);
    this.localStorageService.setItem(LocalStorageKey.Ruchers, this.ruchers);
  }

  modifierRucher(rucher : Rucher){
    this.rucherCourant = rucher;

    this.initFormulaireRucher(rucher);
    this.afficherFormulaireRucher = true;
  }

  setPositionRucher(rucher : Rucher) : Promise<any> {
    return new Promise(resolve =>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=> {
          rucher.position = position;
          resolve()
        }, () => {
          rucher.position = null;
          resolve()
        });
      }else{
        resolve()
      }
    });
  }
}
