import Pagination from 'tui-pagination';
import { renderFilmCard } from "./renderText";
import { api } from './renderText';
import {onInputChange} from './querySearchFilm';


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
  fetchPerPage(currentPage);
});



