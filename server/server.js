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
app.get('/weather', getWeatherHandler);
app.get('/movies', getMovieHandler);





















async function getWeatherHandler(request, response) {
  try {
    const lat = request.query.lat;
    const lon = request.query.lon;

    const key = process.env.WEATHER_KEY;

    const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&days=7&key=${key}`;

    const weatherResponse = await superagent.get(url);

    const weatherObject = JSON.parse(weatherResponse.text);

    const forcasts = weatherObject.data.map(day => new Forcast(day))

    response.send(forcasts);
  } catch (error) {
    console.log("In /weather", `Error code: ${error.status}`, error.text);
  }
}

class Forcast {
  constructor(day) {
    this.forcast = `Description: low of ${day.min_temp}, high of ${day.max_temp} with ${day.weather.description}`;
    this.date = `Date: ${day.datetime}`;
  }
}

async function getMovieHandler(request, response) {
  try {
    const city_name = request.query.city_name;
    const key = process.env.MOVIE_KEY;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${city_name}`

    const movieResponse = await superagent.get(url);
    const movieObject = JSON.parse(movieResponse.text);

    const movies = movieObject.results.map(movie => new Movie(movie));
    response.send(movies);
  } catch (error) {
    console.log("In /movies",`Error code: ${error.status}`, error.text);
  }
}


class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.img_url = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }
}








app.listen(PORT, () => console.log(`listening on ${PORT}`));