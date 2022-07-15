import createModal from "../templetes/modal.hbs";

const modalBtnEl = document.querySelector('#myBtn');
const modalContainerEl = document.querySelector('#myModal');
modalBtnEl.addEventListener('click', onModalBtnClick);

export function onModalBtnClick() {
    modalContainerEl.innerHTML = createModal();
}

