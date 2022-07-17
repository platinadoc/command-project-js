import createModal from "../templates/modal.hbs";

const modalBackdropEl = document.querySelector('[data-modal]');
const closeModalBtnEl = document.querySelector('[data-modal-close]');
const modalEl = document.querySelector('.modal__body');
const openModalBtnEl = document.querySelector('[data-modal-open]');
const outsideModalEl = document.querySelector(".backdrop");
const modalBodyEl = document.querySelector('.modal__body');
const body = document.querySelector("body");

modalEl.innerHTML = createModal();

openModalBtnEl.addEventListener('click', onOpenModalClick);
closeModalBtnEl.addEventListener('click', onCloseModalClick);

body.addEventListener('keydown', onEscapeBtnClick);
outsideModalEl.addEventListener('click', onOutsideModalClick);


function onOpenModalClick() {
    modalBackdropEl.classList.remove("is-hidden");
    body.classList.add("no-scroll");
    modalBodyEl.classList.add('is-unclickable');
}

function onCloseModalClick() {
    modalBackdropEl.classList.add("is-hidden");
    body.classList.remove("no-scroll");
}

function onEscapeBtnClick(e) {
    if (e.code === 'Escape') {
        onCloseModalClick();
        // openModalBtnEl.removeEventListener('click', onOpenModalClick);
        // closeModalBtnEl.removeEventListener('click', onCloseModalClick)
    }
}

function onOutsideModalClick() {
    onCloseModalClick();
        // openModalBtnEl.removeEventListener('click', onOpenModalClick);
        // closeModalBtnEl.removeEventListener('click', onCloseModalClick)
}
 

