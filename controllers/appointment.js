const catchAsync = require('../utilities/catchAsync');
const Appointment = require('../models/appointment');
const Case = require('../models/case');

module.exports.createForm = catchAsync(async (req, res) => {
    let today = new Date()
    let currentDate = new Date().toISOString().slice(0, 10);
    let oneMonth = new Date(today.setMonth(today.getMonth() + 1)).toISOString().slice(0, 10);
    res.render('appointment/create', { currentDate, oneMonth })
})

module.exports.create = catchAsync(async (req, res, next) => {
    const { date } = req.body
    const lawyer = req.user.username
    const appointment = await Appointment.create({ lawyer, date })
    console.log(appointment)
    res.redirect('/');
})

module.exports.readAll = catchAsync(async (req, res, next) => {
    const lawyer = req.user.username;
    //appointments is an array
    const appointments = await Appointment.find({ lawyer });
    res.render('appointment/all', { appointments });
})

module.exports.read = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    const { date } = appointment;
    const cases = await Case.find({ date })
    res.render('appointment/readAppt', { cases })
})