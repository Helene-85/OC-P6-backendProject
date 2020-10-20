const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceControllers = require('../controllers/sauces');

router.get('/', auth, sauceControllers.getAllSauces);
router.get('/:id', auth, sauceControllers.getOneSauce);
router.post('/', auth, multer, sauceControllers.createSauce);
router.post('/:id/like', auth, sauceControllers.addLikeDislike);
router.put('/:id', auth, multer, sauceControllers.modifySauce);
router.delete('/:id', auth, sauceControllers.deleteSauce);

module.exports = router;