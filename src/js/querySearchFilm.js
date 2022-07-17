const inputEl = document.querySelector('.js-inputSearch');

const onInputChange = evt => {
  console.log(evt);
};

inputEl.addEventListener('input', onInputChange);
