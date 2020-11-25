const Sauce = require('../models/Sauce');
const fs = require('fs');

// Mise en place CRUD

// CREATE
exports.createSauce = (req, res, next) => {                                         // Créer une sauce
  const sauceObject = JSON.parse(req.body.sauce);                                   // Extraction de l'objet JSON
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`    // Précision du format d'url des images
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Nouvelle sauce créée !' }))
    .catch((error) => res.status(400).json({ error }));
};

// READ
exports.getAllSauces = (req, res, next) => {                                        // Afficher toutes les sauces 
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {                                         // Afficher une seule sauce
  Sauce.findOne({_id: req.params.id})
    .then((sauce) => {res.status(200).json(sauce);
    })
    .catch((error) => {res.status(404).json({ error: error});
    });
};

// UPDATE
exports.modifySauce = (req, res, next) => {                                         // Modifier une sauce
  const sauceObject = req.file ? 
    {
      ...JSON.parse(sanitize(req.body.sauce)),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'La sauce a été modifiée !' }))
    .catch((error) => res.status(400).json({ error }));
};

// DELETE
exports.deleteSauce = (req, res, next) => {                                         // Supprimer une sauce
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'La sauce a été supprimée !'}))
        .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// Mise en place Like ou Dislike une sauce

exports.addLikeDislike = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
      const userId = req.body.userId;
      let userWantsToLike = (req.body.like === 1);
      let userWantsToDislike = (req.body.like === -1);
      let userWantsToCancel = (req.body.like === 0);
      const userCanLike = (!sauce.usersLiked.includes(userId));
      const userCanDislike = (!sauce.usersDisliked.includes(userId));
      const notTheFirstVote = (sauce.usersLiked.includes(userId) || sauce.usersDisliked.includes(userId));

      if (userWantsToLike && userCanLike) {
        sauce.usersLiked.push(userId)                             // Ajouter le like
      }

      if (userWantsToCancel && notTheFirstVote) {
        if (userCanLike) {
                                                                  // Annuler le like de l'utlisateur
          let index = sauce.usersDisliked.indexOf(userId)
          sauce.usersDisliked.splice(index, 1)
        }
        if (userCanDislike) {
                                                                  // Annuler le dislike de l'utilisateur
          let index = sauce.usersLiked.indexOf(userId)
          sauce.usersLiked.splice(index, 1)
        }
      }

      if (userWantsToDislike && userCanDislike) {                 // Ajouter le dislike
        sauce.usersDisliked.push(userId)
      }
      sauce.likes = sauce.usersLiked.length                       // Calculer le nombre de like et dislike
      sauce.dislikes = sauce.usersDisliked.length
      let newSauce = sauce;
      newSauce.save();                                            // Mettre à jour la sauce avec les nouvelles valeurs

      return newSauce;
  })
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(400).json({error}));
};