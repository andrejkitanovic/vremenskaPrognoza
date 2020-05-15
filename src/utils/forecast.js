const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6f71cf2095c938e2234e8eafd3a6071f`;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Doslo je do greske sa konektovanjem na vremensku prognozu!', undefined);
        } else if (body.message) {
            callback('Doslo je do problema prilikom nalazenja grada', undefined);
        } else {
            callback(undefined, {
                temperatura: kelvinToCelsius(body.main.temp),
                pritisak: body.main.pressure,
                vlaznost:body.main.humidity,
                vetar:body.wind.speed
            });
        }
    })
}

const kelvinToCelsius = kelvin => kelvin - 273.15;

module.exports = forecast;