const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const sauceRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

mongoose.connect('mongodb+srv://Helene-MB:WNK7Pz74chjApjQ@pojet6-openclassrooms.lgx8p.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie YOUPI !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Initialisation des headers pour empécher le CORS de bloquer l'application
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());                                                // Définition de la fonction json comme middleware global

app.use('/images', express.static(path.join(__dirname, 'images')));        // Gestiion de la source de manière statique grâce à Express

app.use("/api/sauces", sauceRoutes);                                       // L'application utilise le endpoint /api/sauces pour les routes sauceRoutes
app.use("/api/auth", userRoutes);                                          // L'application utilise le endpoint /api/auth pour les routes userRoutes

module.exports = app;