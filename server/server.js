"use strict";

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const weather = require("../data/weather.json");

const app = express(); //express() creates an Express application

app.use(cors());

const PORT = process.env.PORT || 3001;

//app.get is the route, and expression is the handler, the first argument is the path
app.get("/", (request, response) => {
  response.send("Hello, world");
});

//Routes HTTP GET requests to the specified path with the specified callback functions.
//(source: Express docs)
app.get("/weather", (request, response) => {
  console.log(
    `
    You requested weather data for:
    Location_name: ${request.query.display_name}
    lat: ${request.query.lat} lon: ${request.query.lon}
    `
  );
  const weatherArray = weather.data.map((day) => new Forcast(day));
  response.send(weatherArray);
});

class Forcast {
  constructor(day){
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
