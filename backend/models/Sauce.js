const mongoose = require("mongoose");

// Modèle de données
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },                 // Identifiant unique MongoDB pour l'utilisateur qui a créé la sauce
    name: { type: String, required: true },                   // Nom de la sauce
    manufacturer: { type: String, required: true },           // Fabricant de la sauce
    description: { type: String, required: true },            // Description de la sauce
    mainPepper: { type: String, required: true },             // Principal ingrédient dans la sauce
    imageUrl: { type: String, required: true },               // String de l'image de la sauce téléchargée par l'utilisateur
    heat: { type: Number, required: true },                   // Nombre entre 1 et 10 pour décrire la sauce
    likes: { type: Number, default: 0 },                      // Nombre d'utilisateurs qui aiment la sauce
    dislikes: { type: Number, default: 0 },                   // Nombre d'utilisateurs qui n'aiment pas la sauce
    usersLiked: { type: [String] },                           // Tableau d'identifiants ayant liké la sauce
    usersDisliked: { type: [String] },                        // Tableau d'identifiants ayant disliké la sauce
});

module.exports = mongoose.model("Sauce", sauceSchema);