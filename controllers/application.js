const catchAsync = require('../utilities/catchAsync');
const Case = require('../models/case');

module.exports.createForm = (req, res) => {
    let today = new Date()
    let currentDate = new Date().toISOString().slice(0, 10);
    let oneMonth = new Date(today.setMonth(today.getMonth() + 1)).toISOString().slice(0, 10);
    res.render('case/create', { currentDate, oneMonth });
};

module.exports.create = catchAsync(async (req, res, next) => {
    const { title, category, description, date, time } = req.body;
    const user = req.user.username
    const application = await Case.create({ title, category, description, date, user, time });
    res.redirect('/');
});

module.exports.history = catchAsync(async (req, res, next) => {
    const user = req.user.username
    const applications = await Case.find({ user });
    res.render('case/history', { applications });
});

module.exports.read = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const application = await Case.findById(id);
    if (application.user == req.user.username || req.user.type == 'lawyer') {
        res.render('case/read', { application });
    }
    else {
        res.redirect('/')
    }
})
