const Sauce = require('../models/Sauce');
const fs = require('fs');

// Mise en place CRUD
exports.createSauce = (req, res, next) => {                                       // CREATE
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Nouvelle sauce créée !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllSauces = (req, res, next) => {                                      // READ
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
    .then((sauce) => {res.status(200).json(sauce);
    })
    .catch((error) => {res.status(404).json({ error: error});
    });
};

exports.modifySauce = (req, res, next) => {                                       // UPDATE
  const sauceObject = req.file ? 
    {
      ...JSON.parse(sanitize(req.body.sauce)),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'La sauce a été modifiée !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {                                       // DELETE
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

exports.addLikeDislike = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(sauce =>{
      const userId = req.body.userId;
      let userWantsToLike = (req.body.like === 1);
      let userWantsToDislike = (req.body.like === -1);
      let userWantsToCancel = (req.body.like === 0);
      const userCanLike = (!sauce.usersLiked.includes(userId));
      const userCanDislike = (!sauce.usersDisliked.includes(userId));
      const notTheFirstVote = (sauce.usersLiked.includes(userId) || sauce.usersDisliked.includes(userId));

      if (userWantsToLike && userCanLike) {
        sauce.usersLiked.push(userId)
      };

      if (userWantsToCancel && notTheFirstVote) {
        sauce.usersLiked.splice(userId, 1)
      };

      if (userWantsToDislike && userCanDislike) {
        sauce.usersDisliked.push(userId)
      };
  });
};