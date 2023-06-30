async function getWeather() {
    const res = await fetch('http://api.weatherapi.com/v1/forecast.json?key=795b320e04e64bbb9aa42005232906&q=46.43,11.85&days=3');

    const result = await res.json();
    return result;    
}

module.exports = {    
    getWeather
}