'use strict';

// Load Environment Variables from .env
require('dotenv').config();

// Application Dependenices
const cors = require('cors');
const express = require('express');
const axios = require('axios')

// Our Dependencies
const weather = require('../data/weather.json');

// Application Setup
const PORT = process.env.PORT || 3001;
const app = express(); //express() creates an Express application
app.use(cors()); // When a request comes in use cors to check it

// Route Definitions
app.get('/weather', getWeatherHandler);





















async function getWeatherHandler(request, response) {
  const url =`https://api.weatherbit.io/v2.0/current?lat=${request.query.lat}&lon=${request.query.lon}&key=${process.env.WEATHER_KEY}`;

  const weatherResponse = await axios.get(url);
  const forcasts = weatherResponse.data.data.map(day => new Forcast(day))

  console.log(forcasts);
  response.send(forcasts);
}



class Forcast {
  constructor(day) {
    this.forcast = day.weather.description;
    this.date = day.datetime;
  }
}











app.listen(PORT, () => console.log(`listening on ${PORT}`));