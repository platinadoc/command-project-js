const homeBtnEl = document.querySelector('.js-home');
const libraryBtnEl = document.querySelector('.js-library');
const headerFilmEl = document.querySelector('.button__menu');
const inputEl = document.querySelector('.search');
const headerEl = document.querySelector('.header');

headerEl.classList.add('header1');

homeBtnEl.addEventListener('click', onHomeBtnClick);
libraryBtnEl.addEventListener('click', onLibraryBtnClick);

function onHomeBtnClick() {
  headerFilmEl.classList.add('js-is-hidden');
  headerEl.classList.add('header1');
  headerEl.classList.remove('header2');
  inputEl.classList.remove('js-is-hidden');
}

function onLibraryBtnClick() {
  headerFilmEl.classList.remove('js-is-hidden');
  headerEl.classList.add('header2');
  headerEl.classList.remove('header1');
  inputEl.classList.add('js-is-hidden');
}
