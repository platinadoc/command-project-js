import createSpinner from '../templates/spinner.hbs'
const bodyEl = document.body;
export function starSpinner () {
  bodyEl.insertAdjacentHTML('afterbegin', createSpinner());
}

export function closeSpinner () {
  bodyEl.querySelector('.spinner').remove();
  // console.log(bodyEl.querySelector('.spinner'))
}
