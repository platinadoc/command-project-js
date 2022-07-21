import axios from 'axios';
import Notiflix from 'notiflix';
import { starSpinner, closeSpinner } from './spinner';

export class TheMovieDBApi {
  #BASE_URL = 'https://api.themoviedb.org/3';
  #API_KEY = 'df75de766bc216630e148042dff14934';
  constructor() {
    this.query = null;
    this.page = 1;
    this.totalPages = 0;
    this.totalItems = 0;
    this.genresMap = null;
  }
  async fetchFilms() {
    const searchParams = new URLSearchParams({
      api_key: this.#API_KEY,
      query: this.query,
      page: this.page,
    });

    try {
      const response = await axios.get(
        `${this.#BASE_URL}/search/movie?${searchParams}&page=${this.page}`
      );
      // this.totalPages = response.data.total_pages;
      return response;
      // .data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchFilmById(id) {
    const params = new URLSearchParams({
      api_key: this.#API_KEY,
      language: 'en-US',
    });
    try {
      const response = await axios.get(
        `${this.#BASE_URL}/movie/${id}?${params}`
      );
      // this.totalPages = response.data.total_pages;
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchTrendingFilms() {
    starSpinner();
    try {
      const response = await axios.get(
        `${this.#BASE_URL}/trending/movie/day?api_key=${this.#API_KEY}&page=${
          this.page
        }`
      );
      // this.totalPages = response.data.total_pages;
      // this.totalItems = response.data.total_results;
      return response;
    } catch (error) {
      console.log(error);
      Notiflix.Notify.warning('error');
    } finally {
      closeSpinner();
    }
  }

  async getGenres() {
    try {
      const response = await axios.get(`
${this.#BASE_URL}/genre/movie/list?api_key=${this.#API_KEY}&language=en-US`);
      const genres = response.data.genres;
      this.genresMap = genres.reduce((previousValue, el) => {
        const elId = el.id;
        previousValue[elId] = el.name;
        return previousValue;
      }, {});
    } catch (error) {
      console.log(error);
      Notiflix.Notify.warning('error id request');
    }
  }

  setQuery(query) {
    this.query = query;
  }
}
