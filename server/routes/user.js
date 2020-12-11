const express = require('express');
const router = express.Router();
const UserControl = require('./controllers/user.control');
const CardControl = require('./controllers/card.control');

// User
router.get('/all', UserControl.getAllUsers);

router.post('/signup', UserControl.signUp);

router.put('/validate', UserControl.validateUser);

router.get('/:id', UserControl.getUser);

// router.put('/signout', UserControl.signOut);


// Card
router.get('/:id/card', CardControl.getCard);

router.post('/:id/card/register', CardControl.createCard);

router.delete('/:id/card/remove', CardControl.removeCard);

router.put('/:id/card/points', CardControl.addPoints);

module.exports = router;