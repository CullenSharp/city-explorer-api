const superagent = require('superagent');

async function getMovieHandler(request, response) {
  try {
    const city_name = request.query.city_name;
    const key = process.env.MOVIE_KEY;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${city_name}`;

    const movieResponse = await superagent.get(url);
    const movieObject = JSON.parse(movieResponse.text);

    const movies = movieObject.results.map(movie => new Movie(movie));
    response.status(200).send(movies);
  } catch (error) {
    console.error(`Error from superagent ${error}`);
    response.status(500).send(`Server error ${error}`);
  }
}

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.img_path = movie.poster_path || movie.backdrop_path;
    this.img_url = this.img_path ? `https://image.tmdb.org/t/p/w500${this.img_path}` : 'https://www.placecage.com/g/500/750';
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }
}

module.exports = getMovieHandler;
