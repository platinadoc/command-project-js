import filmcard from '../templates/filmcard.hbs';
import { TheMovieDBApi } from './fetchfilm';
import {convertFilmsByLibrary} from './convertFilmsByLibrary';

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
  const convertMovies = convertFilmsByLibrary(movies)
  markUpMovies(convertMovies);
}

async function onQueueBtnClick() {
  showWatchedBtnEl.classList.remove("button-active");
  showQueueBtnEl.classList.add("button-active");

  const movies = await getQueueMovies();
  const convertMovies = convertFilmsByLibrary(movies)
  markUpMovies(convertMovies);
}

async function getWatchedMovies() {
  const ids = JSON.parse(localStorage.getItem("watched")) || [];
  const films = await Promise.all(ids.map(async id => {
    return await api.fetchFilmById(id);
  }));
  return films;
}

async function getQueueMovies() {
  const ids = JSON.parse(localStorage.getItem("queue")) || [];
  const films = await Promise.all(ids.map(async id => {
    return await api.fetchFilmById(id);
  }));
  return films;
}

function myLibraryMarkUp(data, ref) {
  // ref.innerHTML = '';

  const markUp = filmcard(data);
  // ref.insertAdjacentHTML("beforeend", markUp);
  moviesEl.innerHTML = markUp;
}

function emptyListMarkUp(ref) {
  moviesEl.innerHTML = '<div>THIS LIST IS EMPTY</div>';
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

