const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5kcmVqMjEzIiwiYSI6ImNrYTRsODVucTAxY28zb251NnQ1OTlmNXoifQ.lYEPoHqcXoZWzrRmlUgQHw&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Doslo je do greske sa konektovanjem na lokaciju!', undefined);
        } else if (body.features.length === 0) {
            callback('Nismo uspeli da nadjemo zeljeni grad!', undefined)
        } else {
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })

}


module.exports = geoCode;