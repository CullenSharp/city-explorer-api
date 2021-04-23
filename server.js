'use strict';

// Load Environment Variables from .env
require('dotenv').config();

// Application Dependenices
const cors = require('cors');
const express = require('express');


// Our Dependencies
const notFound = require('./components/not-found');
const getWeatherHandler = require('./components/get-weather-handler');
const getMovieHandler = require('./components/get-movie-handler');

// Application Setup
const PORT = process.env.PORT || 3002;
const app = express(); //express() creates an Express application
app.use(cors()); // When a request comes in use cors to check it

// Route Definitions
app.get('/weather', getWeatherHandler);
app.get('/movies', getMovieHandler);
app.get('*', notFound);






app.listen(PORT, () => console.log(`listening on ${PORT}`));
