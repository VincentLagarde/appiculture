import { Component, OnInit } from '@angular/core';
import { RucherService } from 'src/app/services/rucher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Visite, Rucher } from 'src/app/models/dataAppiculture.model';

@Component({
  selector: 'app-details-visite',
  templateUrl: './details-visite.component.html',
  styleUrls: ['./details-visite.component.scss']
})
export class DetailsVisiteComponent implements OnInit {

  rucher : Rucher;
  visite : Visite;

  constructor(
    private rucherService : RucherService,
    private route : ActivatedRoute,
    private router : Router,
  ) { 
  }

  ngOnInit() {
    this.rucher = this.rucherService.getRucherAvecIdentifiant(this.route.snapshot.params['id']);
    let visiteExistante =  this.rucher.visites.find(visite => visite.date == this.route.snapshot.params['date']);

    if(visiteExistante){
      this.visite = visiteExistante;
    }else{
      this.router.navigate(['/front/visite-rucher/',  this.rucher.identifiant]);
    }
  }

  back(){
    this.router.navigate(['/front/visite-rucher/',  this.rucher.identifiant]);
  }

}
