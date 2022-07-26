import filmcardLibrary from '../templates/filmcard-library.hbs';
import { TheMovieDBApi } from './fetchfilm';
import { convertFilmsByLibrary } from './convertFilmsByLibrary';
import Pagination from 'tui-pagination';




const container = document.getElementById('tui-pagination-container');
const cardsQuantity = 6;
const option={
  itemsPerPage: cardsQuantity,
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

export const paginationWatched = new Pagination(container, option);
export const paginationQueue = new Pagination(container, option);

const moviesEl = document.querySelector('.js-home-page');
const showWatchedBtnEl = document.querySelector('.watched-button');
const showQueueBtnEl = document.querySelector('.queue-button');

showWatchedBtnEl.addEventListener('click', onWatchedBtnClick);
showQueueBtnEl.addEventListener('click', onQueueBtnClick);


const api = new TheMovieDBApi();

export default function activateLibraryView() {
  onWatchedBtnClick();
}

async function onWatchedBtnClick() {
  showWatchedBtnEl.classList.add('button-active');
  showQueueBtnEl.classList.remove('button-active');
try{
  const movies = await getWatchedMovies();
  console.log(movies);
  const moviesFirstPage = movies.slice(0, cardsQuantity);
  const convertMovies = convertFilmsByLibrary(moviesFirstPage);
  markUpMovies(convertMovies);
  console.log(movies.length);
   paginationWatched.reset(movies.length);
   console.log(paginationWatched);
  // paginationWatched();
} catch (error){
  console.log(error);
}
}

export async function getWatchedMovies() {
  const ids = JSON.parse(localStorage.getItem('watched')) || [];
  const films = await Promise.all(
    ids.map(async id => {
      return await api.fetchFilmById(id);
    })
    );
    
    // paginationWatched.reset(ids.length);
    return films;
}

  paginationWatched.on('afterMove', event => {
  const currentPage = event.page; 
  // const movies = await getWatchedMovies();
  const movies = JSON.parse(localStorage.getItem('watched')) || [];
  const arrayForRenderCurrentPage = movies.slice(
    (currentPage - 1) * cardsQuantity,
    currentPage * cardsQuantity
  );
  console.log(arrayForRenderCurrentPage);
  renderLibraryMarkup(arrayForRenderCurrentPage);


});




// paginationWatched.on('afterMove', event => {
//     const currentPage = event.page;
//     fetchPerPageWatched(currentPage);
//     console.log(fetchPerPageWatched);
//   });
  
//   async function fetchPerPageWatched(page){
//   api.page = page;
//   const response = await getWatchedMovies(1);
//   await renderFilmList(response.data.results);
//   }



//   paginationQueue.on('afterMove', event => {
//     const currentPage = event.page;
//     fetchPerPageQueue(currentPage);   
//   });
  
//   async function fetchPerPageQueue(page){
//   api.page=page;
//   const response=await api.getQueueMovies();
//   renderFilmsList(response.data.results);
//   console.log(renderFilmList());
//   }



async function onQueueBtnClick() {
  showWatchedBtnEl.classList.remove('button-active');
  showQueueBtnEl.classList.add('button-active');

  const movies = await getQueueMovies();
  const convertMovies = convertFilmsByLibrary(movies);
  markUpMovies(convertMovies);
}



async function getQueueMovies() {
  const ids = JSON.parse(localStorage.getItem('queue')) || [];
  const films = await Promise.all(
    ids.map(async id => {
      return await api.fetchFilmById(id);
    })
  );
  return films;
}

function myLibraryMarkUp(data, ref) {
  // ref.innerHTML = '';

  const markUp = filmcardLibrary(data);
  // ref.insertAdjacentHTML("beforeend", markUp);
  moviesEl.innerHTML = markUp;
}

function emptyListMarkUp(ref) {
  moviesEl.innerHTML = '<div>THIS LIST IS EMPTY</div>';
}

function markUpMovies(movies) {
  if (movies.length === 0) {
    // render placeholder

    emptyListMarkUp(moviesEl);
  } else {
    myLibraryMarkUp(movies, moviesEl);
  }
}


function renderLibraryMarkup(array) {
  api.page = 1;
  console.log(api.page);
  let movieMarkup = '';
  array.forEach(el => {
    api.fetchFilmById(el)     
      .then(data => {
        data.release_date = data.release_date.split('-')[0];
        data.vote_average = data.vote_average.toFixed(1);
        movieMarkup += filmcardLibrary(data);
        return movieMarkup;
      })
      .then(data => (moviesEl.innerHTML = data))
      .catch(error => console.log(error));
  });
}
