const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/user');

router.route('/register')
    .get(controller.registerForm)
    .post(controller.register);

router.route('/login')
    .get(controller.loginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }),
        controller.login);

router.get('/logout', controller.logout);

module.exports = router