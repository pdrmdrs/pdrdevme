const express       = require('express');
const path          = require('path');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const mongoose      = require('mongoose');
const session       = require('express-session');
const flash         = require('connect-flash');
const cookieParser  = require('cookie-parser');
const config        = require('./config.json');

const routes = require('./routes');

const app =  express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('short'));

app.use(cookieParser('secret'));

let storeSession = new session.MemoryStore;

app.use(session({
    cookie: { maxAge: 60000 },
    store: storeSession,
    secret: 'secret',
    resave: true,
    saveUninitialized: false
}));
app.use(flash());

app.use(routes);

let mongoDB = config.dburl.replace('<dbuser>', config.dbuser).
                    replace('<dbpassword>', config.dbpassword);

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection Error'));

let port = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log('App listening on port ' + port);
});

