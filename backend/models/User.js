const mongoose = require("mongoose");                           // Importation du package mongoose
const uniqueValidator = require("mongoose-unique-validator");   // Importation du package monggose-unique-validator

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },        // Adresse électronique unique de l'utilisateur
  password: { type: String, required: true }                    // Hachage du mot de passe de l'utilisateur
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);