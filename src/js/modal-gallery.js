import createModal from "../templates/modal-gallery.hbs";
// import axios from "axios";
import { TheMovieDBApi } from './fetchfilm';

const openModalEl = document.querySelector('.js-home-page');
const modalBackdropEl = document.querySelector('[data-modal]');
const closeModalBtnEl = document.querySelector('[data-modal-close]');
const modalEl = document.querySelector('.modal__body');
const outsideModalEl = document.querySelector(".backdrop");
const body = document.querySelector("body");

let movie_id = null;

// class TheMovieDBApi {
//     #BASE_URL = 'https://api.themoviedb.org/3';
//     #API_KEY = 'df75de766bc216630e148042dff14934';
//     constructor() {
//         this.movie_id = null;
//     }
    
//     async fetchFilmsById(movie_id) {
//         const searchParams = new URLSearchParams({
//             api_key: this.#API_KEY,
//             language: 'en-US',
//         });
//         try {
//             const response = await axios.get(
//                 `${this.#BASE_URL}/movie/${movie_id}?${searchParams}`
//             );

//             // console.log(response.data);

//             return response.data;
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }

// const api = new TheMovieDBApi();

// modalEl.innerHTML = createModal();

openModalEl.addEventListener('click', onOpenModalClick);

function onOpenModalClick(e) {
    if (e.target === e.currentTarget) return;

    modalBackdropEl.classList.remove("is-hidden");
    body.classList.add("no-scroll");

    closeModalBtnEl.addEventListener('click', onCloseModalClick);
    body.addEventListener('keydown', onEscapeBtnClick);
    outsideModalEl.addEventListener('click', onOutsideModalClick);

    if (e.target.dataset.id) {
        movie_id = Number(e.target.dataset.id);

        console.log(e.target.dataset.id);

    } else if (e.target.dataset.src) {
        movie_id = Number(e.target.dataset.src);

        console.log(e.target.dataset.src);
    } else {
        return;
    }
 
    renderModalCard(movie_id);

    // const cardObj = api.fetchFilmsById(movie_id);
    
    // modalEl.innerHTML = createModal(cardObj.data.results);
    
    // cardObj.then(data => console.log(data));
    // cardObj.then(data => console.log(data.poster_path));
    // cardObj.then(data => console.log(data.title.));
    // cardObj.then(data => console.log(data.vote_average));
    // cardObj.then(data => console.log(data.vote_count));
    // cardObj.then(data => console.log(data.popularity.toFixed(1)));
    // cardObj.then(data => console.log(data.original_title.));
    // cardObj.then(data => console.log(data.genres.map(el => el.name).join(', ')));

}

function onCloseModalClick() {
    modalBackdropEl.classList.add("is-hidden");
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