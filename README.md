# Projet 6 - Openclassrooms - parcours [Développeur.se Web Fullstack](https://openclassrooms.com/fr/paths/185-developpeur-web)

Construisez une API sécurisée pour une application d'avis gastronomiques

## Scénario du projet

Développement d'une application dans laquelle les users peuvent **ajouter** leurs sauces pimentées favorites.
Les users peuvent aussi **liker** et **disliker**  les sauces ajoutées par les autres users. Pour se faire un.e user peut s'inscrire et se connecter.
Mon rôle est de développer la partie **backend** de l'application, le frontend est fourni par Openclassrooms.

### Compétences évaluées

- Implémenter un modèle logique de données conformément à la réglementation
- Stocker des données de manière sécurisée
- Mettre en œuvre des opérations CRUD de manière sécurisée

### Progression

Projet finalié, en attente de la soutenance pour validation

## Backend Piquante

- serveur **Node.js**,
- base de données **MongoDB** (hébergement MongoDB Atlas),
- framework **Express**,
- pack **Mongoose** (opérations sur la BDD),
- **API REST**, 
- sécurité **RGPD** & **OSWAP**

## Sécurités mises en place

- hashage du mdp user avec **bcrypt**
- validation rapide et robuste des emails avec **email-validator**
- utlisation de variables d'environnement pour les données sensibles avec **dotenv**
- manipulation sécurisée de la base de donnée avec **mongoose**
- authentification du user par token avec **jsonwentoken**
- sécurisation de l'application Express en définissant divers en-têtes HTTP avec **helmet** [équivaut à 11 protections](https://www.npmjs.com/package/helmet)
- création d'un schéma de vérification de mot de passe robuste avec **password-validator**
- vérification qu'un user est unique avec **mongoose-unique-validator**
- création d'un fichier **.env**  (voir .env.exemple) pour protéger les codes secrets et chemins vers la BDD MongoDB

## Frontend Piquante

Le [frontend est fourni par Openclassrooms pour le projet 6](https://github.com/OpenClassrooms-Student-Center/dwj-projet6).
Le projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 7.0.2.
Pour faire fonctionner le projet, vous devez installer node-sass à part.

## Development server

Démarrer `ng serve` pour avoir accès au serveur de développement. Rendez-vous sur `http://localhost:4200/`. L'application va se recharger automatiquement si vous modifiez un fichier source.
