import { TheMovieDBApi } from './fetchfilm';
import filmcard from '../templates/filmcard.hbs';
import axios from 'axios';

export const api = new TheMovieDBApi();
const mainListEl = document.querySelector('.js-home-page');

export async function renderFilmCard() {
  const response = await api.fetchTrendingFilms();

  const films = response.data.results;
  const genresIds = await api.getGenres();
  films.map(el => {
    const changedGenders = el.genre_ids.map(el => {
      el = genresIds[el];
      return el;
    });
    el.genre_ids = changedGenders;
  });
  const filmItemsMarkup = filmcard(films);
  mainListEl.innerHTML = filmItemsMarkup;
}
renderFilmCard();
