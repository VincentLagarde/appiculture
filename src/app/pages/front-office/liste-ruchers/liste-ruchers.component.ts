import { Component, OnInit } from '@angular/core';
import { Rucher } from 'src/app/models/dataAppiculture.model';
import { LocalStorageService, LocalStorageKey } from 'src/app/services/local-storage.service';
import * as moment from 'moment';
import { RucherService } from 'src/app/services/rucher.service';

@Component({
  selector: 'app-liste-ruchers',
  templateUrl: './liste-ruchers.component.html',
  styleUrls: ['./liste-ruchers.component.scss']
})
export class ListeRuchersComponent {
  
  constructor(public rucherService : RucherService) { }
}
