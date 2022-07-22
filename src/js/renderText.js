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
export const paginationTrending = new Pagination(container, {
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

paginationTrending.on('afterMove', event => {
  const currentPage = event.page;
  renderTrendingPerPage(currentPage);
});
// const libraryListEl = document.querySelector('.js-gallery-page');

export async function moveBtnFilmotekaToFirstPage() {
  api.page = 1;
  console.log(api.page);
  if (!api.genresMap) {
    await api.getGenres();
  }
  const fetchWithSpinner = useSpinner(api.fetchTrendingFilms, {
    container: 'body',
  });

  const response = await api.fetchTrendingFilms();
  renderFilmsList(response.data.results);
  paginationTrending.reset(response.data.total_results);

}

export async function renderFilmCard() {
  // console.log(api.page);
  if (!api.genresMap) {
    await api.getGenres();
  }
  const fetchWithSpinner = useSpinner(api.fetchTrendingFilms, {
    container: 'body',
  });

  const response = await api.fetchTrendingFilms();
  renderFilmsList(response.data.results);
  paginationTrending.reset(response.data.total_results);
  paginationTrending.movePageTo(api.page);


}

async function renderTrendingPerPage(page) {
  api.page = page;
  const response = await api.fetchTrendingFilms();
  renderFilmsList(response.data.results);
}

export async function renderFilmsList(films) {

  // async function fetchPerPageWatched(page){
  // api.page=page;
  // const response=await api.getWatchedMovies()
  // await renderFilmsList(response.data.results)
  // }
  // paginationWatched.on('afterMove', event => {
  //   const currentPage = event.page;
  //   fetchPerPageWatched(currentPage);
  // });

const convertedFilms = convertFilms(films)

  // libraryListEl.innerHTML = '';
  const filmItemsMarkup = filmcard(convertedFilms);
  mainListEl.innerHTML = filmItemsMarkup;
}

renderFilmCard();
