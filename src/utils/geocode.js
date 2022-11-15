const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicHVydmlrczA0IiwiYSI6ImNsM3BnMTA0djAyMnMzaXFwMWR3dTVpMzIifQ.ztJsdC-sVndUU__sHreEjA&limit=1'

    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect map service!', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another Search.', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                placename: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode