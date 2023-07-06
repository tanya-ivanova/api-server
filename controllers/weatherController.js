const { getWeather } = require('../services/weatherService');
const {weatherConditions} = require('../util/weather_conditions'); 

const weatherController = require('express').Router();

weatherController.get('/', async (req, res) => {    
    const weather = await getWeather(req.query.latitude, req.query.longitude);
    const currentWeather = {};
    const forecastWeather = [];

    currentWeather.temp = weather.current.temp_c;
    currentWeather.text = weather.current.condition.text;
    currentWeather.code = weather.current.condition.code;
    const matchedCondition = weatherConditions.find(obj => obj.code === currentWeather.code);
    currentWeather.photo = matchedCondition?.icon || 0;
    const date = weather.forecast.forecastday[0].date;
    const currentDate = new Date(date);
    currentWeather.date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    weather.forecast.forecastday.forEach((el) => {  
        const forcastDay = {};

        const dateString = el.date;
        const date = new Date(dateString);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

        forcastDay.date = formattedDate;
        forcastDay.minTemp = el.day.mintemp_c;
        forcastDay.maxTemp = el.day.maxtemp_c;
        forcastDay.text = el.day.condition.text;
        forcastDay.code = el.day.condition.code;

        const matchedCondition = weatherConditions.find(obj => obj.code === forcastDay.code);
        forcastDay.photo = matchedCondition?.icon || 0;

        forecastWeather.push(forcastDay);
    });


    res.json({
        currentWeather,
        forecastWeather
    });
});

module.exports = weatherController;