import createModal from "../templates/modal-gallery.hbs";

const openModalEl = document.querySelector('.js-home-page');

const modalBackdropEl = document.querySelector('[data-modal]');
const closeModalBtnEl = document.querySelector('[data-modal-close]');

const modalEl = document.querySelector('.modal__body');
const outsideModalEl = document.querySelector(".backdrop");
const body = document.querySelector("body");

openModalEl.addEventListener('click', onOpenModalClick);

function onOpenModalClick(e) {
    if (e.target === e.currentTarget) return;

    const data = { id: e.target.dataset.src };
    modalEl.innerHTML = createModal(data);
    
    modalBackdropEl.classList.remove("is-hidden");
    // body.classList.add("no-scroll");

    closeModalBtnEl.addEventListener('click', onCloseModalClick);
    body.addEventListener('keydown', onEscapeBtnClick);
    outsideModalEl.addEventListener('click', onOutsideModalClick);

    const addToWatchedBtnEl = document.querySelector('.js-addToWatched');
    addToWatchedBtnEl.addEventListener('click', addWatchedMovie);

    const addToQueueBtnEl = document.querySelector('.js-addToQueue');
    addToQueueBtnEl.addEventListener('click', addQueueMovie);

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

function addWatchedMovie(e) {
    const movieId = e.target.dataset.id;
    const watchedList = JSON.parse(localStorage.getItem("watched")) || [];
    const idx = watchedList.indexOf(movieId);
    if (idx === -1) {
        watchedList.push(movieId);
    } else {
        watchedList.splice(idx, 1);
    }
    localStorage.setItem("watched", JSON.stringify(watchedList));
}


function addQueueMovie(e) {
    const movieId = e.target.dataset.id;
    const queueList = JSON.parse(localStorage.getItem("queue")) || [];
    const idx = queueList.indexOf(movieId);
    if (idx === -1) {
        queueList.push(movieId);
    } else {
        queueList.splice(idx, 1);
    }
    localStorage.setItem("queue", JSON.stringify(queueList));
}
