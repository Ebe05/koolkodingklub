const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const Appointment = require('../models/appointment')

router.route('/')
    .get(catchAsync(async (req, res) => {
        let today = new Date()
        let currentDate = new Date().toISOString().slice(0, 10);
        let oneMonth = new Date(today.setMonth(today.getMonth() + 1)).toISOString().slice(0, 10);
        res.render('appointment/create', { currentDate, oneMonth })
    }))
    .post(catchAsync(async (req, res, next) => {
        const { date } = req.body
        const lawyer = req.user.username
        const appointment = await Appointment.create({ lawyer, date })
        console.log(appointment)
        res.redirect('/');
    }))

router.get('/all', catchAsync(async (req, res, next) => {
    res.render('appointment/read')
}))

module.exports = router