function startSpinner() {
  spinnerRef.classList.remove('visually-hidden');
  spinnerDotsRefs.classList.remove('visually-hidden');
}

function stopSpinner() {
  spinnerRef.classList.add('visually-hidden');
  spinnerDotsRefs.classList.add('visually-hidden');
}

async function createMarkup() {
  startSpinner();
  try {
    const data = await api.fetchfilm();
    const result = await data.results;
    const markup = await TheMovieDBApi(result);

    insertPoint.insertAdjacentHTML('beforeend', card(markup));
  } catch (error) {
    console.error(error);
  }
}