import { Injectable } from '@angular/core';

import * as FileSaver from 'file-saver';
import * as moment from 'moment';

const JSON_TYPE = "application/json"

@Injectable({
  providedIn: 'root'
})
export class JsonSaverService {

  constructor() { }


  sauvegarderObjEnFichierJson(obj: any, fileName: string): void {
    let json = JSON.stringify(obj);
    const data: Blob = new Blob([json], {type: JSON_TYPE});
    FileSaver.saveAs(data, fileName + moment().format('_DD_MM_YYYY_HH[h]mm') + '.json');
  }

  getJsonAvecFile(fichier : Blob) : Promise<any>{
    return new Promise(resolve => {
      let reader = new FileReader();
      reader.readAsText(fichier, JSON_TYPE);
          
      //Lorsque le fichier est fini d'être lu, on résout la promesse
      reader.addEventListener("load", () => {
        resolve(JSON.parse(<string> reader.result));
      }) 
    })    
  }
}
