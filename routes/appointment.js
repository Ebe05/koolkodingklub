const express = require('express');
const router = express.Router();
const controller = require('../controllers/appointment');
const isLoggedIn = require('../utilities/isLoggedIn')
const validate = require('../utilities/validMidware')

router.route('/')
    .get(isLoggedIn, validate.appointment, controller.createForm)
    .post(controller.create)

router.get('/all', controller.readAll)

router.get('/:id', controller.read)

module.exports = router