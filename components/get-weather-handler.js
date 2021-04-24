const superagent = require('superagent');

const inMemoryDB = {};

async function getWeatherHandler(request, response) {
  try {
    const lat = request.query.lat;
    const lon = request.query.lon;

    const forcastAlreadyFetched = inMemoryDB[lat + lon] !== undefined;
    if (forcastAlreadyFetched) {
      if (inMemoryDB[lat + lon].timestamp + 1000 < Date.now()) {
        const key = process.env.WEATHER_KEY;

        const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&days=7&key=${key}`;

        const weatherResponse = await superagent.get(url);

        const weatherObject = JSON.parse(weatherResponse.text);

        const forcasts = weatherObject.data.map(day => new Forcast(day));

        inMemoryDB[lat + lon] = {
          forcasts,
          timestamp: Date.now()
        };
        console.log('data is old');
        response.status(200).send(forcasts);
      } else {
        console.log('the data is still fresh');
        const forcasts = inMemoryDB[lat + lon].forcasts;
        response.status(200).send(forcasts);
      }
    } else {
      const key = process.env.WEATHER_KEY;

      const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&days=7&key=${key}`;

      const weatherResponse = await superagent.get(url);

      const weatherObject = JSON.parse(weatherResponse.text);

      const forcasts = weatherObject.data.map(day => new Forcast(day));

      inMemoryDB[lat + lon] = {
        forcasts,
        timestamp: Date.now()
      };
      console.log('data is unset');
      response.status(200).send(inMemoryDB);
    }
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