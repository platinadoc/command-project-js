import { TheMovieDBApi } from './fetchfilm';
import filmcard from '../templates/filmcard.hbs';
import Notiflix from 'notiflix';
import placeholder from '../images/placeholder.png';
// import {fetchPerPage} from './pagination';
import { api } from './renderText';
import Pagination from 'tui-pagination';
import { convertFilms } from './convertFilms';

const formEl = document.querySelector('.search__form');
const inputEl = document.querySelector('.js-inputSearch');
const mainListEl = document.querySelector('.js-home-page');
const newApi = new TheMovieDBApi();

// async function onInputChange() {
//   newApi.setQuery(inputEl.value);
//   const searchFilms = await newApi.fetchFilms();
//   const filmArray = searchFilms.data.results;
//   const FilmLi = filmcard(filmArray);
//   mainListEl.innerHTML = FilmLi;
// }

// inputEl.addEventListener('input', onInputChange);

let inputValue = '';
inputEl.addEventListener('input', event => {
  inputValue = event.target.value;
});

const container = document.getElementById('tui-pagination-container');
const pagination = new Pagination(container, {
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
  renderSearchPerPage(currentPage);
});

async function renderSearchPerPage(page) {
  fetchPerPage(page);
  const response = await fetchPerPage(page);
  renderFilmList(response.data.results);
}
export async function fetchPerPage(page) {
  api.page = page;

  const response = await api.fetchFilms();
  renderFilmList(response.data.results);

  // onInputChange();
  if (page === 1) pagination.reset(response.data.total_results);
  return response;
}

const onInputChange = async evt => {
  evt.preventDefault();
  if (inputValue === '') {
    return;
  }
  api.setQuery(inputValue);

  const responsePerPage = await fetchPerPage(1);
  renderFilmList(responsePerPage.data.results);
};
function setGenresToCard(genre_ids) {
  const genresIds = api.genresMap;
  const changedGenders = genre_ids.map(el => {
    el = genresIds[el];
    return el;
  });
  return changedGenders;
}

async function renderFilmList(films) {
  // const filmArray = await responsePerPage.data.results;

  if (films.length === 0) {
    Notiflix.Notify.warning('Nothing found');
    return;
  }
  const convertedFilms = convertFilms(films);

  const filmItemsMarkup = filmcard(convertedFilms);
  mainListEl.innerHTML = filmItemsMarkup;
}

formEl.addEventListener('submit', onInputChange);
