const request = require('request')


const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=d3f7cc14832338c053aece674b7abb32&query='+ encodeURIComponent(latitude) +','+ encodeURIComponent(longitude) +''

    request({url, json:true}, (error, {body}={}) => {

        if(error){
            callback('Unable to connect weather service...',undefined)
        }
        else if (body.error) {
            callback("Unable to find location", undefined)
        }
        else{
            let temperature = body.current.temperature
            let weather_descriptions = body.current.weather_descriptions[0]
            let feelslike = body.current.feelslike

            
            callback(undefined, ('The weather is ') + (weather_descriptions) + ('. The temperature is ') + (temperature) + (' but it feels like ') + (feelslike) + ('.'))
        }
    })
}

module.exports = forecast