import { Component, OnInit } from '@angular/core';
import { LocalStorageService, LocalStorageKey } from 'src/app/services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rucher } from 'src/app/models/dataAppiculture.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-visite-rucher',
  templateUrl: './visite-rucher.component.html',
  styleUrls: ['./visite-rucher.component.scss']
})
export class VisiteRucherComponent implements OnInit {

  rucher : Rucher;

  afficherFormulaireVisite : boolean = false;

  formulaireVisite : FormGroup;

  constructor(
    private localStorageService : LocalStorageService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {
    this.initRucher();
  }

  initRucher(){
    let ruchers : Rucher[] = this.localStorageService.getItem(LocalStorageKey.Ruchers);
    let identifiant = this.route.snapshot.params['id'];

    if(ruchers){
      let rucherExistant = ruchers.find(rucher => rucher.identifiant == identifiant);

      if(rucherExistant){
        this.rucher = rucherExistant;
        console.log(this.rucher)
      }else{
        this.router.navigate(['/front/liste-ruchers']);
      }
    }else{
      this.router.navigate(['/front/liste-ruchers']);
    }
    
  
    
    
  }

  getNombreHause(){

  }

}
