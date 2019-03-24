import { Component, OnInit, Input } from '@angular/core';
import { Rucher } from 'src/app/models/dataAppiculture.model';
import { FormControl, Validators } from '@angular/forms';
import { RucherService } from 'src/app/services/rucher.service';

@Component({
  selector: 'app-frequence-position-rucher',
  templateUrl: './frequence-position-rucher.component.html',
  styleUrls: ['./frequence-position-rucher.component.scss']
})
export class FrequencePositionRucherComponent implements OnInit {

  frequenceVisite : FormControl = new FormControl(null, Validators.min(0));

  _rucher : Rucher;
  
  @Input() set rucher(rucher : Rucher){
    this._rucher = rucher;
    this.frequenceVisite.setValue(this._rucher.frequenceVisite);
  }

  constructor(
    public rucherService : RucherService
  ) { }

  ngOnInit() {
    this.frequenceVisite.valueChanges.subscribe(nouvelleValeur =>{
      if(nouvelleValeur && this.frequenceVisite.valid){
        this._rucher.frequenceVisite = nouvelleValeur;
        this.rucherService.sauvegarderRuchers();
      }
    });
  }

}
