const catchAsync = require('../utilities/catchAsync');
const Case = require('../models/case');


module.exports.createForm = (req, res) => {
    res.render('case/create');
};

module.exports.create = catchAsync(async (req, res, next) => {
    const { title, category, description } = req.body;
    const application = await Case.create({ title, category, description });
    res.redirect('/');
});

module.exports.history = catchAsync(async (req, res, next) => {
    const applications = await Case.find({});
    res.render('case/history', { applications });
});

module.exports.read = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const application = await Case.findById(id);
    res.render('case/read', { application });
})
