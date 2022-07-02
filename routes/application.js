const express = require('express');
const router = express.Router();
const isLoggedIn = require('../utilities/isLoggedIn');
const controller = require('../controllers/application');
const validate = require('../utilities/validMidware')

router.route('/')
    .get(isLoggedIn, controller.createForm)
    .post(isLoggedIn, validate.case, controller.create)

router.get('/history', isLoggedIn, controller.history);

router.get('/:id', isLoggedIn, controller.read);


module.exports = router