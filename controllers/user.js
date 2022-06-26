const catchAsync = require('../utilities/catchAsync');
const User = require('../models/user');

module.exports.registerForm = (req, res) => {
    res.render('user/register');
};

module.exports.register = catchAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err) {
                next(err)
            }
            else {
                res.redirect('/')
            }
        });
    }
    catch (e) {
        res.redirect('/register')
    }
});

module.exports.loginForm = (req, res) => {
    res.render('user/login');
};

module.exports.login = (req, res) => {
    res.redirect(req.session.returnTo);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err)
        }
        else {
            res.redirect('/');
        }
    })
};
