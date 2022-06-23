const express = require('express');
const app = express();
const port = 8080;
const engine = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Case = require('./models/case');
const catchAsync = require('./utilities/catchAsync');
const { application } = require('express');

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

//routes
app.get('/', (req, res) => {
    res.render("home");
});


//handling application form request
app.get('/application', (req, res) => {
    res.render('case/create');
});

app.post('/application', catchAsync(async (req, res, next) => {
    const { title, category, description } = req.body;
    const application = await Case.create({ title, category, description });
    res.redirect('/');
})
);

app.get('/application/history', catchAsync(async (req, res, next) => {
    const applications = await Case.find({});
    res.render('case/history', { applications })
}));

app.get('/application/:id', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const application = await Case.findById(id);
    res.render('case/read', { application });
}));


app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});