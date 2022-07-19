const headerEl = document.querySelector('.header');
const homeBtnEl = headerEl.querySelector('.js-home');
const libraryBtnEl = headerEl.querySelector('.js-library');
const headerFilmEl = headerEl.querySelector('.button__menu');
const inputEl = headerEl.querySelector('.search__form');
const logoEl = headerEl.querySelector('.navigation__logo');
const btnHome = headerEl.querySelector('.navigation__link.js-library');
const btnLibrary = headerEl.querySelector('.navigation__link.js-home');
const searchBtn = headerEl.querySelector('.search__icon');

const galleryContainerEl = document.querySelector('.js-main-container-list');

headerEl.classList.add('header1');
btnLibrary.classList.add('library');

logoEl.addEventListener('click', onLogoBtnClick);
homeBtnEl.addEventListener('click', onHomeBtnClick);
libraryBtnEl.addEventListener('click', onLibraryBtnClick);
searchBtn.addEventListener('click', onSearchBtnClick);



function onSearchBtnClick() {}

function onLogoBtnClick() {
  onHomeBtnClick();
}

function onHomeBtnClick() {
  headerFilmEl.classList.add('js-is-hidden');
  headerEl.classList.add('header1');
  headerEl.classList.remove('header2');
  inputEl.classList.remove('js-is-hidden');
  btnHome.classList.remove('home');
  btnLibrary.classList.add('library');

  galleryContainerEl.classList.add('js-home-page');
  galleryContainerEl.classList.remove('js-library-page');
}

function onLibraryBtnClick() {
  headerFilmEl.classList.remove('js-is-hidden');
  headerEl.classList.add('header2');
  headerEl.classList.remove('header1');
  inputEl.classList.add('js-is-hidden');
  btnHome.classList.add('home');
  btnLibrary.classList.remove('library');

  galleryContainerEl.classList.add('js-library-page');
  galleryContainerEl.classList.remove('js-home-page');
}
