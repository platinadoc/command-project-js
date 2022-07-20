import Pagination from 'tui-pagination';
import { TheMovieDBApi } from './fetchfilm';
import filmcard from '../templates/filmcard.hbs';
import { spinnedFn } from './spinner';
import placeholder from '../images/placeholder.png';
import useSpinner from 'use-spinner';
import 'use-spinner/assets/use-spinner.css';
import { convertFilms } from './convertFilms';
// import { pagination } from './pagination';

export const api = new TheMovieDBApi();
const mainListEl = document.querySelector('.js-home-page');

const container = document.getElementById('tui-pagination-container');
export const pagination = new Pagination(container, {
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: false,
  firstItemClassName: 1,
  template: {
    currentPage: '<a class="page-btn is-selected">{{page}}</a>',
    page: '<a class="page-btn">{{page}}</a>',
    moveButton: `<button class="move-btn move-btn-{{type}}"></button>`,
    disabledMoveButton:
      '<button class="move-btn move-btn-{{type}} disabled" disabled></button>',
    moreButton: '<a class="page-btn next-is-ellip last-child">...</a>',
  },
});

pagination.on('afterMove', event => {
  const currentPage = event.page;
  renderTrendingPerPage(currentPage);
});
// const libraryListEl = document.querySelector('.js-gallery-page');

export async function renderFilmCard() {
  if (!api.genresMap) {
    await api.getGenres();
  }
  const fetchWithSpinner = useSpinner(api.fetchTrendingFilms, {
    container: 'body',
  });

  const response = await api.fetchTrendingFilms();
  renderFilmsList(response.data.results);
  pagination.reset(response.data.total_results);
}

async function renderTrendingPerPage(page) {
  api.page = page;
  const response = await api.fetchTrendingFilms();
  renderFilmsList(response.data.results);
}

export async function renderFilmsList(films) {

const convertedFilms = convertFilms(films)

  // libraryListEl.innerHTML = '';
  const filmItemsMarkup = filmcard(convertedFilms);
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
