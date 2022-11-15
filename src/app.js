const path = require('path')
const express = require('express')
const exp = require('constants')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for Express config
const publicdirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')//when we create views directory in root of the project then below syntax is not needed
app.set('views', viewsPath)


hbs.registerPartials(partialspath)


//setup static directory to serve
app.use(express.static(publicdirPath))


app.get('' , (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'purvik'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Page',
        name: 'venil'
    })
})

app.get('/weather', (req,res) => {
    
    if(!req.query.address) {
        res.send({
            error: "You must provide a addres tearm"
        })
    }
    else{

        geocode(req.query.address, (error, { latitude, longitude, placename } = {}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            forecast(latitude, longitude, (error, forecastData) => {

                if (error) {
                    return res.send({
                        error: error
                    })
                }

                res.send(
                    {
                        address: req.query.address,
                        placename,
                        forecast: forecastData,

                    }
                )
            })

        })
        
    }

})

app.get('/help', (req,res)=> {
    res.render('help',{
        title: 'Help Page!',
        name: 'jenish'
    })
})

app.get('/help/*',(req,res)=>{
    res.send('Help article not found')
})

app.get('*', (req,res)=>{
    res.render('404page')
})

app.listen(3000, ()=>{
    console.log('server is started on port 3000')
})