import { Component, OnInit } from '@angular/core';
import { Rucher } from 'src/app/models/dataAppiculture.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RucherService } from 'src/app/services/rucher.service';

@Component({
  selector: 'app-ruches-ruchers',
  templateUrl: './ruches-ruchers.component.html',
  styleUrls: ['./ruches-ruchers.component.scss']
})
export class RuchesRuchersComponent implements OnInit {
  rucherCourant : Rucher;
 
  formulaireRucher : FormGroup;
  afficherFormulaireRucher : boolean = false;

  constructor(
    private formBuilder : FormBuilder,
    public rucherService : RucherService
  ) { }

  ngOnInit() {
    this.initFormulaireRucher();
  }

  /** Permet d'initialiser le formulaire de création ou modification d'un rucher selon si est un rucher est fourni en paramètres */
  initFormulaireRucher(rucher? : Rucher){
    if(rucher){
      this.formulaireRucher = this.formBuilder.group({
        identifiant : [rucher.identifiant, [Validators.required, Validators.maxLength(256)]],
        nombreRuches : [rucher.nombreRuches, [Validators.required, Validators.min(0)]],
        descriptif : [rucher.descriptif, Validators.required],
      }); 
    }else{
      this.formulaireRucher = this.formBuilder.group({
        identifiant : ['', [Validators.required, Validators.maxLength(256)]],
        nombreRuches : [1, [Validators.required, Validators.min(0)]],
        descriptif : [this.rucherService.environnements.length != 0 ? this.rucherService.environnements[0] : '' , Validators.required]
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
      await this.rucherService.setPositionRucher(rucher);

      //On ajoute le rucher à la liste
      this.rucherService.ruchers.push(rucher);
      this.rucherService.sauvegarderRuchers();

      this.initFormulaireRucher();
    }
  }

  supprimerRucher(index : number){
    this.rucherService.ruchers.splice(index,1);
    this.rucherService.sauvegarderRuchers();
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
  
      this.rucherService.sauvegarderRuchers();
     
      this.rucherCourant = null;
      this.initFormulaireRucher();
      this.afficherFormulaireRucher = false;
    }
  }
}
