import { Component, OnInit } from '@angular/core';
import { RucherService } from 'src/app/services/rucher.service';
import { Rucher } from 'src/app/models/dataAppiculture.model';
import { Router } from '@angular/router';
declare let L;

@Component({
  selector: 'app-carte-ruchers',
  templateUrl: './carte-ruchers.component.html',
  styleUrls: ['./carte-ruchers.component.scss']
})
export class CarteRuchersComponent implements OnInit {


  constructor(
    private rucherService : RucherService,
    private router : Router
  ) { }

  ngOnInit() {
    let latitude = 50;
    let longitude = -0.09;

    if(this.rucherService.ruchers.length != 0 && this.rucherService.ruchers[0].position){
      latitude = this.rucherService.ruchers[0].position.latitude;
      longitude =  this.rucherService.ruchers[0].position.longitude;
    }

    const map = L.map('leafMap').setView([latitude, longitude], 19);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    let rucherSansPosition : Rucher[] = [];

    //Pour chaque ruchers
    this.rucherService.ruchers.forEach(rucher => {
      //On ajoute un marker sur la carte si c'est possible
      if(rucher.position){
        let iconeRuche = L.divIcon({     
          iconSize: new L.Point(30, 30),     
          iconAnchor: new L.Point(15, 0),    
          className:  'leaflet-icon-'+this.rucherService.getCouleurSelonRucher(rucher)
        });

        let marker = L.marker([rucher.position.latitude, rucher.position.longitude], {icon: iconeRuche }).bindPopup(rucher.identifiant+ ' : '+rucher.descriptif).addTo(map)
        marker.openPopup();
        marker.on('click', ()=> {
            this.router.navigate(['/front/visite-rucher', rucher.identifiant]);
          });
      }else{
        rucherSansPosition.push(rucher);
      }
    })

    if(rucherSansPosition.length != 0){
      let chaine = '';
      rucherSansPosition.forEach(rucher=>{
        chaine += rucher.identifiant + '\r\n';
      });

      alert("Ces ruchers n'ont pas de position définie : \r\n"+chaine);
    }
  }

}
