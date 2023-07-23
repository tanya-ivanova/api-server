const fetch = require('node-fetch');

async function getWeather(latitude, longitude) {
    const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?q=${latitude},${longitude}&days=3`);

    const result = await res.json();    
    return result;    
}

module.exports = {    
    getWeather
}