'use strict';

// Load Environment Variables from .env
require('dotenv').config();

// Application Dependenices
const cors = require('cors');
const express = require('express');
const superagent = require('superagent')

// Our Dependencies
const weather = require('../data/weather.json');

// Application Setup
const PORT = process.env.PORT || 3001;
const app = express(); //express() creates an Express application
app.use(cors()); // When a request comes in use cors to check it

// Route Definitions





















async function getWeatherHandler(request, response) {
  try {
    const lat = request.query.lat;
    const lon = request.query.lon;

    const key = process.env.WEATHER_KEY;

    const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_KEY}`;

    const weatherResponse = await superagent.get(url);

    const weatherObject = JSON.parse(weatherResponse.text);

    const forcasts = weatherObject.data.map(day => new Forcast(day))

    response.send(forcasts);
  } catch(error) {
    console.log(error);
  }
}

app.get('/weather', getWeatherHandler);


class Forcast {
  constructor(day) {
    this.forcast = day.weather.description;
    this.date = day.datetime;
  }
}











app.listen(PORT, () => console.log(`listening on ${PORT}`));