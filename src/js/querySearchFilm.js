import { TheMovieDBApi } from './fetchfilm';
import filmcard from '../templates/filmcard.hbs';
import Notiflix from 'notiflix';
import placeholder from '../images/placeholder.png';
// import {fetchPerPage} from './pagination';
import {api} from './renderText';
import Pagination from 'tui-pagination';


const formEl = document.querySelector('.search__form');
const inputEl = document.querySelector('.js-inputSearch');
const mainListEl = document.querySelector('.js-home-page');

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

async function renderSearchPerPage (page) {
  fetchPerPage (page);  
  const response = await fetchPerPage (page);
  renderFilmList(response.data.results);
}
export async function fetchPerPage(page) {
  api.page = page;
  console.log("page", api.page);
  const response = await api.fetchFilms();
  renderFilmList(response.data.results);
  console.log(response.data.total_pages);
  // onInputChange();  
  if (page === 1) pagination.reset(response.data.total_results);
  return response
}


const onInputChange = async evt => {
  evt.preventDefault();
  const inputValue = inputEl.value.trim();
  if (inputValue === '') {
    return;
  }
  api.setQuery(inputValue);
  console.log(inputValue);
  console.log(api.query);
  
  const responsePerPage = await fetchPerPage(1);
  renderFilmList(responsePerPage.data.results);

  // const getQueryFilms = await api.fetchFilms();  
}

async function renderFilmList(films) {
// const filmArray = await responsePerPage.data.results;
console.log(films);
const convertFilms = films.map(el => {
  if (el.poster_path) {
    // el.poster_path = `https://image.tmdb.org/t/p/w500${el.poster_path}`;
    console.log(el.poster_path);
    return {...el, poster_path: `https://image.tmdb.org/t/p/w500${el.poster_path}`}
  } else {
    // el.poster_path = placeholder;
    console.log(el.poster_path);
    return {...el, poster_path:placeholder}
  } 
  return el
});
if (films.length === 0) {
  Notiflix.Notify.warning('Nothing found');
  return;
}
const textFilmRender = filmcard(convertFilms);
console.log(convertFilms);
mainListEl.innerHTML = textFilmRender;
};

formEl.addEventListener('submit', onInputChange);

