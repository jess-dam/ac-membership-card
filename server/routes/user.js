const express = require('express');
const router = express.Router();
const UserControl = require('./controllers/user.control');
const CardControl = require('./controllers/card.control');

// User
router.get('/');

router.post('/signup');

router.put('/signin');

router.put('/signout');


// Card
router.get('/card');

router.post('/card/register');

router.delete('/card/remove');

router.put('/card/points');

module.exports = router;