const express = require('express');
const router = express.Router();
const isLoggedIn = require('../utilities/isLoggedIn');
const controller = require('../controllers/application');

router.route('/')
    .get(isLoggedIn, controller.createForm)
    .post(isLoggedIn, controller.create)

router.get('/history', isLoggedIn, controller.history);

router.get('/id', controller.read);


module.exports = router