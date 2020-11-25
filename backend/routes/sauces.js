const express = require('express');                                         // Importation du package Express
const router = express.Router();                                            // Création router sauces avec la méthode router d'Express

const auth = require('../middleware/auth');                                 // Importation du middleware auth.js pour protéger les routes
const multer = require('../middleware/multer-config');                      // Importation du multer-config pour l'ajout d'images

const sauceControllers = require('../controllers/sauces');

// Routes avec authentification + multer si nécessaire (images)
router.get('/', auth, sauceControllers.getAllSauces);
router.get('/:id', auth, sauceControllers.getOneSauce);
router.post('/', auth, multer, sauceControllers.createSauce);
router.post('/:id/like', auth, sauceControllers.addLikeDislike);
router.put('/:id', auth, multer, sauceControllers.modifySauce);
router.delete('/:id', auth, sauceControllers.deleteSauce);

module.exports = router;