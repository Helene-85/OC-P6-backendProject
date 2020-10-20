const bcrypt = require('bcrypt');                                               // Importation du package bcrytp
const jwt = require('jsonwebtoken');                                            // Importation du package jasonwebtoken
const emailValidator = require('email-validator');                              // Importation du package email-validator
const passwordValidator = require('password-validator');                        // Importation du package password-validator
const sanitize = require('express-mongo-sanitize');                             // Importation du package mongo-sanitize

const User = require('../models/User');

const passwordSchema = new passwordValidator();

passwordSchema
  .is().min(8)                                                                  // La longueur minimale du mdp est de 8 caractères
  .is().max(60)                                                                 // La longueur maximale du mdp est de 60 caractères
  .has().uppercase()                                                            // Le mdp doit contenir au moins une majuscule
  .has().lowercase()                                                            // Le mdp doit contenir au moins une minuscule
  .has().digits()                                                               // Le mdp doit contenir au moins un chiffre
  .has().not().spaces()                                                         // le mdp ne doit pas contenir d'espace

exports.signup = (req, res, next) => {
  if (!emailValidator.validate(sanitize(req.body.email)) || !passwordSchema.validate(sanitize(req.body.password))) {
    return res.status(401).json({message: 'Email ou mot de passe incorrect. Le mot de passe doit contenir entre 8 à 60 caractères, sans espace' + 
    'et inclure au moins une majuscule et un chiffre'})
  } else if (emailValidator.validate(sanitize(req.body.email)) && passwordSchema.validate(sanitize(req.body.password))) {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
    }
};

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
