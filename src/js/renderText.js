import { TheMovieDBApi } from './fetchfilm';
import filmcard from '../templates/filmcard.hbs';
import axios from 'axios';

export const api = new TheMovieDBApi();
const mainListEl = document.querySelector('.js-home-page');

// const libraryListEl = document.querySelector('.js-gallery-page');

export async function renderFilmCard() {
  const response = await api.fetchTrendingFilms();

  const films = response.data.results;
  const genresIds = await api.getGenres();
  films.map(el => {
    if (!el.poster_path) {
      el.poster_path = placeholder;
    } else {
      el.poster_path = `https://image.tmdb.org/t/p/w500${el.poster_path}`;
    }
  });
  films.map(el => {
    const changedGenders = el.genre_ids.map(el => {
      el = genresIds[el];
      return el;
    });
    el.genre_ids = changedGenders;
  });
  // libraryListEl.innerHTML = '';
  const filmItemsMarkup = filmcard(films);
  mainListEl.innerHTML = filmItemsMarkup;
}

// export async function renderLibraryFilmCard() {
//   const response = await api.fetchTrendingFilms();

//   const films = response.data.results;
//   const genresIds = await api.getGenres();
//   films.map(el => {
//     if (!el.poster_path) {
//       el.poster_path = placeholder;
//     } else {
//       el.poster_path = `https://image.tmdb.org/t/p/w500${el.poster_path}`;
//     }
//   });
//   films.map(el => {
//     const changedGenders = el.genre_ids.map(el => {
//       el = genresIds[el];
//       return el;
//     });
//     el.genre_ids = changedGenders;
//   });
//   mainListEl.innerHTML = '';
//   const filmItemsMarkup = filmcard(films);
//   libraryListEl.innerHTML = filmItemsMarkup;
// }


renderFilmCard();
