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
  async getGenres() {
    try {
      const response = await axios.get(`
${this.#BASE_URL}/genre/movie/list?api_key=${this.#API_KEY}&language=en-US`);
      const genres = response.data.genres;

      return genres.reduce((previousValue, el) => {
        const elId = el.id;
        previousValue[elId] = el.name;
        return previousValue;
      }, {});
    } catch (error) {
      console.log(error);
      Notiflix.Notify.warning('error id request');
    }
  }
  async getImagesUrl(id) {
    try {
      const response = await axios.get(`
${this.#BASE_URL}/movie/${id}/images?api_key=${this.#API_KEY}&language=en-US`);
      return response.config.url;
    } catch (error) {
      console.log(error);
      Notiflix.Notify.warning('error img request');
    }
  }
  setQuery(query) {
    this.query = query;
  }
}
