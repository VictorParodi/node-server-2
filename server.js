const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
let app = express();


hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} => ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

app.use((req, res, next) => {
    res.render('maintenance');
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Home Page!',
        welcomeMessage: 'Welcome to this site!!!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page!',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Page not found'
    });
});

app.listen(3000);