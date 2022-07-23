import Pagination from 'tui-pagination';
import {fetchPerPage} from './querySearchFilm';



const container = document.getElementById('tui-pagination-container');
const option={
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
}

export const pagination = new Pagination(container, option);
pagination.on('afterMove', event => {
  const currentPage = event.page;
  fetchPerPage(currentPage);
});







