const express = require('express');
const app = express();
const port = 8080;
const engine = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Case = require('./models/case');
const catchAsync = require('./utilities/catchAsync');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user');
const isLoggedIn = require('./utilities/isLoggedIn');


//connecting to mongo
mongoose.connect('mongodb://localhost:27017/kkk');

//setting up view engine
app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.set('views', path.join(__dirname, '/views'));

//setting up method-override
app.use(methodOverride('_method'));

//parsing form data
app.use(express.urlencoded({ extended: true }));

//configuring session
const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));


//configuring passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//routes

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next()
})

app.get('/', (req, res) => {
    res.render("home");
});

//handling application form request
app.get('/application', isLoggedIn, (req, res) => {
    res.render('case/create');
});

app.post('/application', isLoggedIn, catchAsync(async (req, res, next) => {
    const { title, category, description } = req.body;
    const application = await Case.create({ title, category, description });
    res.redirect('/');
})
);

app.get('/application/history', isLoggedIn, catchAsync(async (req, res, next) => {
    const applications = await Case.find({});
    res.render('case/history', { applications });
}));

app.get('/application/:id', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const application = await Case.findById(id);
    res.render('case/read', { application });
}));

//registration
app.get('/register', (req, res) => {
    res.render('user/register');
});

app.post('/register', catchAsync(async (req, res, next) => {
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
}));

//login
app.get('/login', (req, res) => {
    res.render('user/login');
});

app.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), (req, res) => {
    res.redirect(req.session.returnTo);
});

//logout
app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err)
        }
        else {
            res.redirect('/');
        }
    })
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});