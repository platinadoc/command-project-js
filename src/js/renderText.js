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
    let arrayGenders = [];
    arrayGenders = el.genre_ids;

    arrayGenders.map((el, i) => {
      const arrayLength = arrayGenders.length;
      const filtredArrey = arrayGenders.splice(0, arrayLength, genresIds[el]);

      el.genre_ids = filtredArrey;
    });
    return el;
  });
  console.log(films);
  const filmItemsMarkup = filmcard(films);

  mainListEl.innerHTML = filmItemsMarkup;
}
renderFilmCard();
