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


  setAllAvecJson(json : any){
    console.log("json",json)
    localStorage.clear();
    for(let propriete in json){
     
      console.log("propriete",propriete)
    
      localStorage.setItem(propriete, json[propriete]);
      //this.setItem(propriete, json[propriete]);
    }
    console.log("localStorage", localStorage)
  }
}



export enum LocalStorageKey {
  FrequenceGlobaleVisite = 'frequenceGlobaleVisite',
  Environnements = 'environnements',
  Ruchers = 'ruchers'
}