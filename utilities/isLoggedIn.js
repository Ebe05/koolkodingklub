function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        res.redirect('/login')
    }

    else {
        next()
    }
}

module.exports = isLoggedIn