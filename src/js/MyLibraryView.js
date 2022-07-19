import filmcard from '../templates/filmcard.hbs';
import { TheMovieDBApi } from './fetchfilm';

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
  showWatchedBtnEl.classList.add("button-active");
  showQueueBtnEl.classList.remove("button-active");

  const movies = await getWatchedMovies();

  markUpMovies(movies);
}

async function onQueueBtnClick() {
  showWatchedBtnEl.classList.remove("button-active");
  showQueueBtnEl.classList.add("button-active");

  const movies = await getQueueMovies();

  markUpMovies(movies);
}

async function getWatchedMovies() {
  var ids = JSON.parse(localStorage.getItem("watched")) || [];
  var films = await Promise.all(ids.map(async id => {
    return await api.fetchFilmById(id);
  }));
  return films;
}

async function getQueueMovies() {
  var ids = JSON.parse(localStorage.getItem("queue")) || [];
  var films = await Promise.all(ids.map(async id => {
    return await api.fetchFilmById(id);
  }));
  return films;
}

function myLibraryMarkUp(data, ref) {
  ref.innerHTML = '';

  const markUp = filmcard(data);
  ref.insertAdjacentHTML("beforeend", markUp);
}

function emptyListMarkUp(ref) {
  ref.innerHTML = '<div>THIS LIST IS EMPTY</div>';
};

function markUpMovies(movies) {
  if (movies.length === 0) {
    // render placeholder
    console.log('render placeholder');
    emptyListMarkUp(moviesEl);
  } else {
    myLibraryMarkUp(movies, moviesEl)
  }
}

