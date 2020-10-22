const bcrypt = require('bcrypt');                                               // Importation du package bcrytp
const jwt = require('jsonwebtoken');                                            // Importation du package jasonwebtoken

const User = require('../models/User');

// Inscription
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ message: 'Cette adresse email est déjà utilisée :/' }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Connexion
exports.login = (req, res, next) => {
    User.findOne({ email: sanitize(req.body.email) })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(sanitize(req.body.password), user.password)
            .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({                                                   // Si le mot de passe est validé, un nouveau token est encodé
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                `${process.env.JWT_KEY}`,                                            // Code aléatoire de 32 caractères masqué grâce à dotenv
                { expiresIn: '24h' }                                                 // Expiration de la session au bout de 24h
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};
