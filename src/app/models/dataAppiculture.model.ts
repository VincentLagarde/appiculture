export interface DataAppiculture {
    configuration : {
        environnements : string[],
        frequenceGlobaleVisite : number
    },
    ruchers : Rucher[]
}

export interface Rucher {
    identifiant : string,
    nombreRuches : number,
    descriptif : string,
    position? : {
        latitude : number,
        longitude : number
    }
    dateCreation : Date,
    visites : Visite[],
    frequenceVisite : number
}

export interface Visite {
    date : Date,
    dynamiqueDeveloppement : string,
    nourritureApportee? : string,
    nombreHaussesRecoltes : number,
    observationsPreparatifs : string
}