import createModal from "../templates/modal-gallery.hbs";

const openModalEl = document.querySelector('.js-home-page');

const modalBackdropEl = document.querySelector('[data-modal]');
const closeModalBtnEl = document.querySelector('[data-modal-close]');

const modalEl = document.querySelector('.modal__body');
const outsideModalEl = document.querySelector(".backdrop");
const body = document.querySelector("body");

modalEl.innerHTML = createModal();

openModalEl.addEventListener('click', onOpenModalClick);

function onOpenModalClick(e) {
    if (e.target === e.currentTarget) return;
  
    modalBackdropEl.classList.remove("is-hidden");
    // body.classList.add("no-scroll");

    closeModalBtnEl.addEventListener('click', onCloseModalClick);
    body.addEventListener('keydown', onEscapeBtnClick);
    outsideModalEl.addEventListener('click', onOutsideModalClick);
}

function onCloseModalClick() {
    modalBackdropEl.classList.add("is-hidden");
    body.classList.remove("no-scroll");

    closeModalBtnEl.removeEventListener('click', onCloseModalClick);
    body.removeEventListener('keydown', onEscapeBtnClick);
    outsideModalEl.removeEventListener('click', onOutsideModalClick);
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
 

