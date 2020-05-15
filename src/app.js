const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

//Putanje fajlova
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Handlebar engine i lokacij za view
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Podesavanje statickog direktorijuma
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Vremenska Prognoza',
        name: 'Andrej Kitanovic'
    })
})

app.get('/onama', (req, res) => {
    res.render('about', {
        title: 'O nama',
        name: 'Andrej Kitanovic'
    })
})

app.get('/pomoc', (req, res) => {
    res.render('help', {
        title: 'Pomoc',
        name: 'Andrej Kitanovic',
        message: 'Ovo je stranica za pomoc'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.adresa) {
        return res.send({
            greska: 'Niste uneli grad'
        })
    }

    geoCode(req.query.adresa, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                greska: error
            })
        }

        forecast(latitude, longitude, (error, { temperatura, pritisak, vlaznost, vetar }) => {
            if (error) {
                return res.send({
                    greska: error
                })
            }

            return res.send({
                grad: location,
                temperatura,
                pritisak,
                vlaznost,
                vetar
            })

        })
    })
})

app.get('/proizvodi', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Niste uneli nista u pretrazi'
        })
    }

    res.send({
        products: []
    })

})

app.get('/pomoc/*', (req, res) => {
    res.render('404', {
        title: '404 Help stranica nije nadjena',
        name: 'Andrej Kitanovic'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 nije nadjena',
        name: 'Andrej Kitanovic'
    })
})

app.listen(port, () => {
    console.log('Server radi na portu ' + port)
})