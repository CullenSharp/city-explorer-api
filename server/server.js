"use strict";

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const weather = require("../data/weather.json");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

app.get("/weather", (request, response) => {
  const weatherArray = weather.data.map((day) => new Forcast(day));
  response.send(weatherArray);
});

function Forcast(day) {
  this.date = day.valid_date;
  this.description = day.weather.description;
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
