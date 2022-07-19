import createModal from "../templates/modal-gallery.hbs";
import { TheMovieDBApi } from './fetchfilm';
// import axios from "axios";

const openModalEl = document.querySelector('.js-home-page');
const modalBackdropEl = document.querySelector('[data-modal]');
const closeModalBtnEl = document.querySelector('[data-modal-close]');
const modalEl = document.querySelector('.modal__body');
const outsideModalEl = document.querySelector(".backdrop");
const body = document.querySelector("body");

openModalEl.addEventListener('click', onOpenModalClick);

function onOpenModalClick(e) {
    if (e.target === e.currentTarget) return;

    modalBackdropEl.classList.remove("visually__hidden");
    body.classList.add("no-scroll");

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
    modalBackdropEl.classList.add("visually__hidden");
    body.classList.remove("no-scroll");

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

async function renderModalCard(movie_id) {

    const api = new TheMovieDBApi(movie_id);
    
    const response = await api.fetchFilmById(movie_id);

    // console.log(response);
    
    modalEl.innerHTML = createModal(response);
}