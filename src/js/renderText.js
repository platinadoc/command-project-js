import { TheMovieDBApi } from './fetchfilm';
import filmcard from '../templates/filmcard.hbs';
import axios from 'axios';

const api = new TheMovieDBApi();
const mainListEl = document.querySelector('.js-home-page');

async function renderFilmCard() {
  const response = await api.fetchTrendingFilms();

  const films = response.data.results;
  const genresIds = await api.getGenres();
  console.log(genresIds);
  films.map(el => {
    const changedGenders = el.genre_ids.map(el => {
      el = genresIds[el];
      return el;
    });
    el.genre_ids = changedGenders;
  });
  const filmId = films.map(el => el.id);
  console.log(
    filmId
      .map(el => api.getImagesUrl(el))
      .map(el => el.then(url => console.log(url)))
  );

  console.log(films);
  const filmItemsMarkup = filmcard(films);
  console.log(filmItemsMarkup);
  mainListEl.innerHTML = filmItemsMarkup;
}
renderFilmCard();
