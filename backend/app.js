const express = require('express');                   // Importation du framework Express
const bodyParser = require('body-parser');            // Importation du package body-parser
const mongoose = require('mongoose');                 // Importation du package mongoose 
const path = require('path');                         // Importation du package monngoose-path
const helmet = require('helmet');                     // Importation du package helmet

require('dotenv').config()                            // Importation et configuration du module dotenv

const sauceRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

mongoose.connect('mongodb+srv://'+ process.env.DB_USER +':'+ process.env.DB_PASS +'@'+ process.env.DB_COLL +'.'+ process.env.DB_HOST + '/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie YOUPI !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Configuration des CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());                                                // Parse le body des requêtes en JSON

app.use('/images', express.static(path.join(__dirname, 'images')));        // Gestion de la source de manière statique grâce à Express

app.use(helmet());                                                         // Activation de la protection Helmet : équivaut à 11 protections

app.use("/api/sauces", sauceRoutes);                                       // L'application utilise le endpoint /api/sauces pour les routes sauceRoutes
app.use("/api/auth", userRoutes);                                          // L'application utilise le endpoint /api/auth pour les routes userRoutes

module.exports = app;                                                      // Exportation du fichier pour l'utiliser sur le serveur Node