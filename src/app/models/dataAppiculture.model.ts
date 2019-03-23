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
    position? : Position
    dateCreation : Date,
    historiqueVisite : string[],
    frequenceVisite : number
}