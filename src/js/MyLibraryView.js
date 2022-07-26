import filmcardLibrary from '../templates/filmcard-library.hbs';
import { TheMovieDBApi } from './fetchfilm';
import { convertFilmsByLibrary } from './convertFilmsByLibrary';
import Pagination from 'tui-pagination';
import placeholder from '../images/placeholder.png';

const api = new TheMovieDBApi();

const moviesEl = document.querySelector('.js-home-page');
const showWatchedBtnEl = document.querySelector('.watched-button');
const showQueueBtnEl = document.querySelector('.queue-button');

showWatchedBtnEl.addEventListener('click', onWatchedBtnClick);
showQueueBtnEl.addEventListener('click', onQueueBtnClick);

const container = document.getElementById('tui-pagination-container');
const cardsQuantity = 6;
const option = {
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


const paginationWatched = new Pagination(container, option);
const paginationQueue = new Pagination(container, option);

export default function activateLibraryView() {
  onWatchedBtnClick();
}


async function onWatchedBtnClick() {
  showWatchedBtnEl.classList.add('button-active');
  showQueueBtnEl.classList.remove('button-active');
  try {
    const movies = JSON.parse(localStorage.getItem('watched')) || [];
    // console.log(movies);
    const moviesFirstPage = movies.slice(0, cardsQuantity);
    renderLibraryMarkup(moviesFirstPage);   
    paginationWatched.reset(movies.length);
    // console.log(paginationWatched);    
  } catch (error) {
    console.log(error);
  }
}

paginationWatched.on('afterMove', event => {
  const currentPage = event.page;
  const movies = JSON.parse(localStorage.getItem('watched')) || [];
  const arrayForRenderCurrentPage = movies.slice(
    (currentPage - 1) * cardsQuantity,
    currentPage * cardsQuantity
    );
    // console.log(arrayForRenderCurrentPage);
    renderLibraryMarkup(arrayForRenderCurrentPage);
    
  });
  
  export async function getWatchedMovies() {
    const ids = JSON.parse(localStorage.getItem('watched')) || [];
    const films = await Promise.all(
      ids.map(async id => {
        return await api.fetchFilmById(id);
      })
    );
  
    return films;
  }

async function onQueueBtnClick() {
  showWatchedBtnEl.classList.remove('button-active');
  showQueueBtnEl.classList.add('button-active');
  try {
    const movies = JSON.parse(localStorage.getItem('queue')) || [];
    if (movies.length === 0){
      emptyListMarkUp();
      console.log(emptyListMarkUp);
    }
    // console.log(movies);
    const moviesFirstPage = movies.slice(0, cardsQuantity);
    renderLibraryMarkup(moviesFirstPage);   
    paginationQueue.reset(movies.length);
    // console.log(paginationQueue);    
  } catch (error) {
    console.log(error);
  } 
}

  paginationQueue.on('afterMove', event => {
    const currentPage = event.page;
    const movies = JSON.parse(localStorage.getItem('queue')) || [];
    const arrayForRenderCurrentPage = movies.slice(
      (currentPage - 1) * cardsQuantity,
      currentPage * cardsQuantity
    );
    // console.log(arrayForRenderCurrentPage);
    renderLibraryMarkup(arrayForRenderCurrentPage);
  });



  function renderLibraryMarkup(array) {
    let movieMarkup = '';
    array.forEach(el => {
      api.fetchFilmById(el)
        .then(data => {
          if (!data.poster_path) {data.poster_path = placeholder } 
          else {data.poster_path = `https://image.tmdb.org/t/p/w500${data.poster_path}` }
  
          data.release_date = data.release_date.split('-')[0];
          data.vote_average = data.vote_average.toFixed(1);
          movieMarkup += filmcardLibrary(data);
          return movieMarkup;
        })
        .then(data => (moviesEl.innerHTML = data))
        .catch(error => console.log(error));
    });
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
  const markUp = filmcardLibrary(data);  
  moviesEl.innerHTML = markUp;
}

function emptyListMarkUp(ref) {
  moviesEl.innerHTML = '<div>THIS LIST IS EMPTY</div>';
}

function markUpMovies(movies) {
  if (movies.length === 0) {  
    emptyListMarkUp(moviesEl);
  } else {
    myLibraryMarkUp(movies, moviesEl);
  }
}


