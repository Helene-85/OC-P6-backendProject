// Implémenter l'authentification dans l'application : contrôle du TOKEN envoyé par l'app frontend

const jwt = require('jsonwebtoken');                                        // Importation du package JsonWebToken

module.exports = (req, res, next) => {
  try {                                                                     
    const token = req.headers.authorization.split(' ')[1];                  // Contrôle des headers
    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);       // Contrôle du TOKEN
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {                    // Contrôle si l'id user est valide
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({                                                  // S'il y a une seule erreur : envoi du message d'erreur
      error: new Error('Invalid request!')
    });
  }
};