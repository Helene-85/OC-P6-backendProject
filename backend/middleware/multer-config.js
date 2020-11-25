const multer = require('multer');                               // Importation du package multer pour les fichiers entrants

const MIME_TYPES = {                                            // Précise les formats d'images autorisés : dictionnaire
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({                            // Indique la destination des images : sur le disque
  destination: (req, file, callback) => {
    callback(null, 'images');                                   // Destination précise dossier images
  },
  filename: (req, file, callback) => {                          // Explique quel nom de fichier utiliser
    const name = file.originalname.split(' ').join('_');        // Nom d'origine : on rempalce les espaces par "_"
    const extension = MIME_TYPES[file.mimetype];                // Ajout d'une extension au mime type
    callback(null, name + Date.now() + '.' + extension);        // Création du filename : ajout du timestamp + "." + l'extension
  }
});

module.exports = multer({storage: storage}).single('image');    // Exportation du middleware