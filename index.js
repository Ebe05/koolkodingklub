const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
require('dotenv').config()
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
const MongoStore = require('connect-mongo')
//connecting to mongo
// mongoose.connect('mongodb://localhost:27017/kkk');
const dbUrl = process.env.DBURL
mongoose.connect(dbUrl);

//setting up view engine
app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.set('views', path.join(__dirname, '/views'));

//serving static files
app.use(express.static('public'))

//setting up method-override
app.use(methodOverride('_method'));

//parsing form data
app.use(express.urlencoded({ extended: true }));

const secret = process.env.SECRET

//mongo session
const store = MongoStore.create({
    mongoUrl: dbUrl,
    secret: 'thisisnotasecret',
    touchAfter: 24 * 60 * 60
})


//configuring session
const sessionConfig = {
    store,
    secret: 'thisisnotasecret',
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

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next()
});

//routes
const userRoutes = require('./routes/user');
const applicationRoutes = require('./routes/application');
const appointmentRoutes = require('./routes/appointment')

app.use('/', userRoutes);
app.use('/application', applicationRoutes);
app.use('/appointment', appointmentRoutes)

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});