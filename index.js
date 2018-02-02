const express = require('express')

const app =  express()

let port = 3000 || process.env.PORT

app.get('/', (req, res, next) => {
    res.send('Olá mundo!')
})

app.listen(3000, () => {
    console.log('App listening on port ' + port)
})
