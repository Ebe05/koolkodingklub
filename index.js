const express = require('express');
const app = express();
const port = 8080;
const engine = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose')

const Case = require('./models/case')

//connecting to mongo
mongoose.connect('mongodb://localhost:27017/kkk');

//setting up view engine
app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.set('views', path.join(__dirname, '/views'));

//setting up method-override
app.use(methodOverride('_method'))

//parsing form data
app.use(express.urlencoded({ extended: true }));

//routes
app.get('/', (req, res) => {
    res.render("home");
});

app.get('/application', (req, res) => {
    res.render('case/create');
});

app.post('/application', (req, res, next) => {
    console.log('post done')
    res.redirect('/')
})


app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});