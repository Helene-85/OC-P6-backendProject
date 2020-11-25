const express = require("express");                         // Importation du package Express
const router = express.Router();                            // Création router users avec la méthode router d'Express

// Importation des logiques métier pour les routes
const userController = require("../controllers/user");

// Importation du middleware verifyPassword pour contrôler la complexité du mot de passe
const verifyPassword = require("../middleware/verifyPassword");

// Route POST pour l'inscription d'un utilisateur
router.post("/signup", verifyPassword, userController.signup);

// Route POST pour la connexion d'un utilisateur
router.post("/login", userController.login);

module.exports = router;