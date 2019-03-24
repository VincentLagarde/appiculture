import { Component, OnInit } from '@angular/core';
import { RucherService } from 'src/app/services/rucher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rucher, Visite } from 'src/app/models/dataAppiculture.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-creer-visite',
  templateUrl: './creer-visite.component.html',
  styleUrls: ['./creer-visite.component.scss']
})
export class CreerVisiteComponent implements OnInit {

  rucher : Rucher;

  formulaireCreationVisite : FormGroup;

  constructor(
    private rucherService : RucherService,
    private route : ActivatedRoute,
    private formBuilder : FormBuilder,
    private router : Router
  ) { }

  ngOnInit() {
    this.rucher = this.rucherService.getRucherAvecIdentifiant(this.route.snapshot.params['id']);
  
    this.formulaireCreationVisite = this.formBuilder.group({
      date : [new Date(), Validators.required],
      dynamiqueDeveloppement : '',
      nourritureApportee : '',
      nombreHaussesRecoltes : [0, [Validators.required, Validators.min(0)]],
      observationsPreparatifs : ''
    }); 
  }

  creerUneVisite(){
    this.formulaireCreationVisite.value.date = new Date(this.formulaireCreationVisite.value.date);
    this.rucher.visites.push(this.formulaireCreationVisite.value);
    
    //On trie les visites de la plus récente à la moins récente
    this.rucher.visites = this.rucher.visites.sort(function(visiteA, visiteB){
      return <any> new Date(visiteB.date) -  <any> new Date(visiteA.date);
    });   

    this.rucherService.sauvegarderRuchers();
    this.router.navigate(['/front/visite-rucher/', this.rucher.identifiant]);
  }


}
