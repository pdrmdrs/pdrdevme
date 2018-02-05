const express       = require('express');
const path          = require('path');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');

const routes = require('./routes');

const app =  express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('short'));

app.use(routes);

let port = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log('App listening on port ' + port);
});
