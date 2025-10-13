import type {
  Genre,
  GenresResponse,
  Movie,
  PopularMoviesResponse,
} from '../types';
import { tmdbApi } from './tmdbApi';

let genresCache: { [key: number]: string } | null = null;

const getGenresMap = async (): Promise<{ [key: number]: string }> => {
  if (genresCache) {
    return genresCache;
  }

  try {
    const response: GenresResponse = await tmdbApi.getMovieGenres();

    genresCache = response.genres.reduce(
      (acc: { [key: number]: string }, genre: Genre) => {
        acc[genre.id] = genre.name;
        return acc;
      },
      {}
    );
    return genresCache;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return {};
  }
};

export const getPopularMovies = async (
  page: number = 1
): Promise<PopularMoviesResponse> => {
  try {
    const [response, genresMap] = await Promise.all([
      tmdbApi.popular(page),
      getGenresMap(),
    ]);

    const dataFormatted = response.results.map((movie: Movie) => ({
      ...movie,
      backdrop_path: `${import.meta.env.VITE_TMDB_IMAGE_URL}${movie.backdrop_path}`,
      poster_path: `${import.meta.env.VITE_TMDB_IMAGE_URL}${movie.poster_path}`,
      genres: movie.genre_ids.map((id) => genresMap[id]).filter(Boolean),
    }));

    return { ...response, results: dataFormatted };
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<any> => {
  try {
    const response = await tmdbApi.searchMovies(query, page);
    return response;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (id: string): Promise<any> => {
  try {
    const response = await tmdbApi.getMovieDetails(id);
    return response;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
