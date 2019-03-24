Application réalisée sous Angular 7.

Binôme :
  - Vincent Lagarde
  - Alexis Nadaud


Structure de l'application : 

AppModule :
  - BackOfficeModule ('/back') :
    - ConfigurationComponent ('/back/configuration') :
      - configurer les environnements types
      - configurer fréquence visite globale
      - sauvegarder/exporter données de l'application format json
      
    - RuchesRuchersComponent ('/back/ruches-ruchers') :
      - créer/modifier/supprimer un rucher
      
  - FrontOfficeModule ('/front') : 
    - ListeRuchersComponent ('/front/liste-ruchers') :
      - liste les ruchers avec indicateur couleur
      - sélection d'un rucher redirige sur VisiteRucherComponent
      
    - CarteRuchersComponent ('/front/carte-ruchers') : 
      - liste les ruchers sur une carte avec marqueur couleur
      - sélection d'un rucher redirige sur VisiteRucherComponent
      
    - VisiteRucherComponent ('/front/visite-rucher/:id') : 
      - affiche les informations du rucher
      - listage des visites
      - sélection d'une visite redirige sur DetailsVisiteComponent
      - création d'une visite redirige sur CreerVisiteComponent
      
    - DetailsVisiteComponent ('/front/visite-rucher/:id') : 
      - affiche les détails d'une visite d'un rucher
      
    - CreerVisiteComponent ('/front/creer-visite/:id') : 
      - créer une visite


On utilise trois services dans l'application :
  - LocalStorageService :
    - récupère et initialise des données dans le localStorage
  - RucherService :
    - utilise LocalStorageService
    - manipule l'ensemble des données de l'application
  - JsonSaverService : 
    - exporte des données dans un fichier json
    - récupère un objet au format json à partir d'un fichier

 
Dans src/app/models/dataAppiculture.model.ts se trouve la structure des données utilisée dans l'application.
