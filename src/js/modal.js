import createModal from "../templates/modal.hbs";

const openModalBtnEl = document.querySelector('[data-modal-open]');
const closeModalBtnEl = document.querySelector('[data-modal-close]');
const modalBackdropEl = document.querySelector('[data-modal]');
const modalEl = document.querySelector('.modal');
const body = document.querySelector("body");

modalEl.innerHTML = createModal();

openModalBtnEl.addEventListener('click', toggleModal);
closeModalBtnEl.addEventListener('click', toggleModal);

function toggleModal() {
    modalBackdropEl.classList.toggle("is-hidden");
    body.classList.toggle("no-scroll");
}
