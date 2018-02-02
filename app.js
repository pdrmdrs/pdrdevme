const express = require('express');

const index_routes = require('./routes');

const app =  express();

let port = 3000 || process.env.PORT;

//entry page for the app
app.get('/', (req, res, next) => {
    // res.send('Olá mundo!')
    res.redirect('/login')
});

app.use('/', index_routes);

app.use((req, res, next) => {
    res.status(404);
    res.send('404: File not found.');
});

app.listen(3000, () => {
    console.log('App listening on port ' + port)
});
