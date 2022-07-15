import axios from 'axios';
import Notiflix from 'notiflix';

export class TheMovieDBApi {
  #BASE_URL = 'https://api.themoviedb.org/3';
  #API_KEY = 'df75de766bc216630e148042dff14934';
  constructor() {
    this.query = null;
  }
  async fetchFilms() {
    const searchParams = new URLSearchParams({
      api_key: this.#API_KEY,
      query: this.query,
    });
    try {
      const response = await axios.get(
        `${this.#BASE_URL}/search/movie?${searchParams}`
      );

      return response;
    } catch (error) {
      console.log(error);
      Notiflix.Notify.warning('error');
    }
  }

  async fetchTrendingFilms() {
    try {
      const response = await axios.get(
        `${this.#BASE_URL}/trending/movie/day?api_key=${this.#API_KEY}`
      );

      return response;
    } catch (error) {
      console.log(error);
      Notiflix.Notify.warning('error');
    }
  }
  setQuery(query) {
    this.query = query;
  }
}
