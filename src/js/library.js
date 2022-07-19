import Notiflix from "notiflix";
import {createLibraryCard} from "../templates/librarycard.hbs";
import galleryContainerEl from "./header";
import { api } from './renderText';

export const createMarkupWatchedForLibrary = () => {
  const arrayOfWatchedFilms = JSON.parse(localStorage.getItem('watched'));
  console.dir(arrayOfWatchedFilms);

  if (!arrayOfWatchedFilms) {
    Notiflix.Notify.failure("You don't have watched films in your library");
return;
  }
  let markup = '';
  arrayOfWatchedFilms.forEach(el => {
    console.log(el);
    api.fetchFilmById(el)
      .then(data => {
        console.log(data);
        data.release_date = data.release_date.split('-')[0];
        console.log(data.id);
        markup += createLibraryCard(data);
        console.log(markup);
        return markup;
      })
      .then(data => (galleryContainerEl.innerHTML = data))
      .catch(error => console.log(error));
  });

}  