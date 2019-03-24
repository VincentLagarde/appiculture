import { Component, OnInit } from '@angular/core';
import { LocalStorageService, LocalStorageKey } from 'src/app/services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rucher } from 'src/app/models/dataAppiculture.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RucherService } from 'src/app/services/rucher.service';

@Component({
  selector: 'app-visite-rucher',
  templateUrl: './visite-rucher.component.html',
  styleUrls: ['./visite-rucher.component.scss']
})
export class VisiteRucherComponent implements OnInit {

  rucher : Rucher;
  selectionDateHausse : FormControl = new FormControl();

  constructor(
    public rucherService : RucherService,
    private route : ActivatedRoute
  ) { }

  ngOnInit() {
    this.rucher = this.rucherService.getRucherAvecIdentifiant(this.route.snapshot.params['id']);
    this.selectionDateHausse.setValue(this.rucher.dateCreation);
  }


  getNombreHause(){
    let nombreHausse = 0;
    this.rucher.visites.forEach(visite =>{
      if(new Date(visite.date) >= new Date(this.selectionDateHausse.value)){
        nombreHausse += visite.nombreHaussesRecoltes;
      }
    })
    return nombreHausse;
  }

}
