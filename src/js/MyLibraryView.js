import filmcard from '../templates/filmcard.hbs';

const moviesEl = document.querySelector('.js-home-page');
const showWatchedBtnEl = document.querySelector('.watched-button');
const showQueueBtnEl = document.querySelector('.queue-button');

showWatchedBtnEl.addEventListener('click', onWatchedBtnClick);
showQueueBtnEl.addEventListener('click', onQueueBtnClick);

// const moviesExample = [
//   {
//     adult: false,
//     backdrop_path: "/9eAn20y26wtB3aet7w9lHjuSgZ3.jpg",
//     genre_ids: [12, 28, 878],
//     id: 507086,
//     media_type: "movie",
//     original_language: "en",
//     original_title: "Jurassic World Dominion",
//     overview: "Four years after Isla Nublar was destroyed, dinosaurs now live—and hunt—alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history’s most fearsome creatures.",
//     popularity: 6252.796,
//     poster_path: "/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
//     release_date: "2022-06-01",
//     title: "Jurassic World Dominion",
//     video: false,
//     vote_average: 6.876,
//     vote_count: 1418
//   },
//   {
//     adult: false,
//     backdrop_path: "/9eAn20y26wtB3aet7w9lHjuSgZ3.jpg",
//     genre_ids: [12, 28, 878],
//     id: 507086,
//     media_type: "movie",
//     original_language: "en",
//     original_title: "Jurassic World Dominion",
//     overview: "Four years after Isla Nublar was destroyed, dinosaurs now live—and hunt—alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history’s most fearsome creatures.",
//     popularity: 6252.796,
//     poster_path: "/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
//     release_date: "2022-06-01",
//     title: "Jurassic World Dominion",
//     video: false,
//     vote_average: 6.876,
//     vote_count: 1418
//   }
// ]

// localStorage.setItem('watched', JSON.stringify(moviesExample));
// localStorage.setItem('queue', JSON.stringify([...moviesExample, ...moviesExample]));

function onWatchedBtnClick() {
  const movies = getWatchedMovies();

  markUpMovies(movies);
}

function onQueueBtnClick() {
  const movies = getQueueMovies();

  markUpMovies(movies);
}

function getWatchedMovies() {
  return JSON.parse(localStorage.getItem("watched"));
}

function getQueueMovies() {
  return JSON.parse(localStorage.getItem("queue"));
}

function myLibraryMarkUp(data, ref) {
  ref.innerHTML = '';

  const markUp = filmcard(data);
  ref.insertAdjacentHTML("beforeend", markUp);
}

function emptyListMarkUp(ref) {
  ref.innerHTML = '<div>THIS LIST IS EMPTY</div>';
};

function markUpMovies(movies) {
  if (movies.length === 0) {
    // render placeholder
    console.log('render placeholder');
    emptyListMarkUp(moviesEl);
  } else {
    myLibraryMarkUp(movies, moviesEl)
  }
}

// export default MyLibrary;
