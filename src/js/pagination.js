import Pagination from 'tui-pagination';
import TheMovieDBApi from './fetchfilm';
import cardTpl from '../templates/filmcard.hbs';
import {renderFilmCard} from "./renderText";
import {api} from './renderText';
// const api = new TheMovieDBApi();
// console.log(TheMovieDBApi);

const container = document.getElementById('tui-pagination-container');
const pagination = new Pagination(container, {
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: false,
  firstItemClassName: 1,
  // lastItemClassName:
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
  fetchPerPage(currentPage);
});
// console.log(api);
async function fetchPerPage(page) {
  // api.query = '';
  // console.log( api.page);
  api.page = page;
  // console.log( api.page);
  const response = await api.fetchTrendingFilms();
  await renderFilmCard();
  // clearContainer();
  // appendGalleryMarkup(response.hits);
  // api.innerHTML = cardTpl(response.results);
  // console.log(cardTpl);
  if (page === 1) pagination.reset(response.total_results);
}
document.onload = fetchPerPage(1);





