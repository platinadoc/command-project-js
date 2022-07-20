export const convertFilmsByLibrary = films => {
  return films.map(film => {
    return {
      ...film,
      poster_path: film.poster_path
        ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
        : placeholder,
      release_date: film.release_date.split('-')[0],
      genre_ids: film.genres.map(el => el.name),
    };
  });
};
