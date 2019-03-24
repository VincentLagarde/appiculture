import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key : LocalStorageKey) : any{
    let item : string = localStorage.getItem(key);
    return JSON.parse(item);
  }

  setItem(key : LocalStorageKey | string, item : any){
    let jsonString = JSON.stringify(item);
    localStorage.setItem(key, jsonString);
  }

  /** Efface tout le contenu du localStorage, et sauvegarde chaque propriétés de l'objet dans le localStorage */
  setAllAvecJson(json : any){
    localStorage.clear();
    for(let propriete in json){
      localStorage.setItem(propriete, json[propriete]);
    }
  }
}



export enum LocalStorageKey {
  FrequenceGlobaleVisite = 'frequenceGlobaleVisite',
  Environnements = 'environnements',
  Ruchers = 'ruchers'
}