const superagent = require('superagent');

async function getWeatherHandler(request, response) {
  try {
    const lat = request.query.lat;
    const lon = request.query.lon;

    const key = process.env.WEATHER_KEY;

    const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&days=7&key=${key}`;

    const weatherResponse = await superagent.get(url);

    const weatherObject = JSON.parse(weatherResponse.text);

    const forcasts = weatherObject.data.map(day => new Forcast(day));

    response.status(200).send(forcasts);
  } catch (error) {
    console.error(`Error from superagent ${error}`);
    response.status(500).send(`Server error ${error}`);
  }
}

class Forcast {
  constructor(day) {
    this.forcast = `Description: low of ${day.min_temp}, high of ${day.max_temp} with ${day.weather.description}`;
    this.date = `Date: ${day.datetime}`;
  }
}

module.exports = getWeatherHandler;
