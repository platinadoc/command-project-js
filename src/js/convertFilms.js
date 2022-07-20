import { api } from "./renderText";

export function convertFilms (films) {
    const genresIds = api.genresMap;
    return films.map(el => {
        const changedGenres = el.genre_ids.map(el => {
          el = genresIds[el];
          return el;
        });
        const formatedDate = el.release_date.split('-')[0];
    
        if (!el.poster_path) {
          return {
            ...el,
            poster_path: placeholder,
            genre_ids: changedGenres,
            release_date: formatedDate,
          };
        } else {
          return {
            ...el,
            poster_path: `https://image.tmdb.org/t/p/w500${el.poster_path}`,
            genre_ids: changedGenres,
            release_date: formatedDate,
          };
        }
      });
}