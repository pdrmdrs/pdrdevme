const express       = require('express');
const path          = require('path');
const bodyParser    = require('body-parser');

const index_routes = require('./routes');

const app =  express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

let port = 3000 || process.env.PORT;

//entry page for the app
app.get('/', (req, res, next) => {
    // res.send('Olá mundo!')
    res.render('index');
});
app.get('/index', (req, res, next) => {
    res.redirect('/');
});

app.use(index_routes);

//handle 404
app.use((req, res, next) => {
    res.status(404);
    res.render('404');
});

app.listen(3000, () => {
    console.log('App listening on port ' + port);
});
