import Pagination from 'tui-pagination';
import { api } from "./renderText";
import {fetchTrendingFilms} from './fetchfilm';
import useSpinner from 'use-spinner';
import 'use-spinner/assets/use-spinner.css';
import {renderFilmsList} from './renderText';
import { pagination } from "./pagination";

api.page = 1;

export async function moveBtnFilmotekaToFirstPage() {
  console.log(api.page);
  if (!api.genresMap) {
    await api.getGenres();
  }
  const fetchWithSpinner = useSpinner(api.fetchTrendingFilms, {
    container: 'body',
  });

  const response = await api.fetchTrendingFilms();
  renderFilmsList(response.data.results);
  pagination.reset(response.data.total_results);
  pagination.movePageTo(api.page);


}