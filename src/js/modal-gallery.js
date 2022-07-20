import createModal from '../templates/modal-gallery.hbs';
import { convertFilms } from './convertFilms';
import { TheMovieDBApi } from './fetchfilm';
import placeholder from '../images/placeholder.png';
// import axios from "axios";

const openModalEl = document.querySelector('.js-home-page');
const modalBackdropEl = document.querySelector('[data-modal]');
const closeModalBtnEl = document.querySelector('[data-modal-close]');
const modalEl = document.querySelector('.modal__body');
const outsideModalEl = document.querySelector('.backdrop');
const body = document.querySelector('body');
let movie_id = null;
openModalEl.addEventListener('click', onOpenModalClick);

function onOpenModalClick(e) {
  if (e.target === e.currentTarget) return;

  modalBackdropEl.classList.remove('visually__hidden');
  body.classList.add('no-scroll');

  closeModalBtnEl.addEventListener('click', onCloseModalClick);
  body.addEventListener('keydown', onEscapeBtnClick);
  outsideModalEl.addEventListener('click', onOutsideModalClick);

  const dataId = e.target.dataset;

  if (dataId.id) {
    movie_id = Number(dataId.id);
  } else if (dataId.src) {
    movie_id = Number(dataId.src);
  } else if (dataId.hero) {
    movie_id = Number(dataId.hero);
  } else if (dataId.genres) {
    movie_id = Number(dataId.genres);
  } else if (dataId.release) {
    movie_id = Number(dataId.release);
  } else if (dataId.vote) {
    movie_id = Number(dataId.vote);
  } else if (dataId.list) {
    movie_id = Number(dataId.list);
  } else {
    return;
  }

  renderModalCard(movie_id);
}

function onCloseModalClick() {
  modalBackdropEl.classList.add('visually__hidden');
  body.classList.remove('no-scroll');

  closeModalBtnEl.removeEventListener('click', onCloseModalClick);
  body.removeEventListener('keydown', onEscapeBtnClick);
  outsideModalEl.removeEventListener('click', onOutsideModalClick);

  modalEl.innerHTML = '';
}

function onEscapeBtnClick(e) {
  if (e.code === 'Escape') {
    onCloseModalClick();
  }
}

function onOutsideModalClick(e) {
  if (e.target !== e.currentTarget) return;

  onCloseModalClick();
}

function addWatchedMovie(e) {
  const movieId = e.target.dataset.id;
  const watchedList = JSON.parse(localStorage.getItem('watched')) || [];
  const idx = watchedList.indexOf(movieId);
  if (idx === -1) {
    watchedList.push(movieId);
  } else {
    watchedList.splice(idx, 1);
  }
  localStorage.setItem('watched', JSON.stringify(watchedList));
}

function addQueueMovie(e) {
  const movieId = e.target.dataset.id;
  const queueList = JSON.parse(localStorage.getItem('queue')) || [];
  const idx = queueList.indexOf(movieId);
  if (idx === -1) {
    queueList.push(movieId);
  } else {
    queueList.splice(idx, 1);
  }
  localStorage.setItem('queue', JSON.stringify(queueList));
}

async function renderModalCard(movie_id) {
  const api = new TheMovieDBApi(movie_id);

  const response = await api.fetchFilmById(movie_id);

  // const filmList = [response];

  console.log(response);
  // const modalFilm = convertFilms(filmList)[0];

  response.popularity = response.popularity.toFixed(1);

  response.poster_path = response.poster_path
    ? `https://image.tmdb.org/t/p/w500${response.poster_path}`
    : placeholder;

  modalEl.innerHTML = createModal(response);

  const addToWatchedBtnEl = document.querySelector('.js-addToWatched');
  addToWatchedBtnEl.addEventListener('click', addWatchedMovie);

  const addToQueueBtnEl = document.querySelector('.js-addToQueue');
  addToQueueBtnEl.addEventListener('click', addQueueMovie);
}
