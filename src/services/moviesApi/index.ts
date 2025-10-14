import type {
  GetMoviesQuery,
  Movie,
  MovieDTO,
  MoviesResponse,
} from '../../types';
import api from '../api';

export const movieApi = {
  getMovies: async ({
    page = 1,
    genre,
    releaseYear,
    minRating,
    sortBy = 'popularity',
    search,
  }: GetMoviesQuery): Promise<MoviesResponse> => {
    const params = new URLSearchParams();
    params.append('page', page.toString());

    if (genre) params.append('genre', genre);
    if (releaseYear) params.append('releaseYear', releaseYear);
    if (minRating) params.append('minRating', minRating);
    if (sortBy) params.append('sortBy', sortBy);
    if (search) params.append('search', search);

    const response = await api.get(`/movies?${params.toString()}`);
    return response.data;
  },

  getMovieById: async (id: string): Promise<Movie> => {
    const response = await api.get(`/movies/${id}`);
    return response.data as Movie;
  },

  createMovie: async (
    movieData: MovieDTO
  ): Promise<{ message: string; movie: Movie }> => {
    const response = await api.post('/movies', movieData);
    return {
      message: response.data.message,
      movie: response.data.movie as Movie,
    };
  },

  updateMovie: async (
    id: string,
    movieData: Partial<MovieDTO>
  ): Promise<{ message: string; movie: Movie }> => {
    const response = await api.put(`/movies/${id}`, movieData);
    return {
      message: response.data.message,
      movie: response.data.movie as Movie,
    };
  },

  deleteMovie: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/movies/${id}`);
    return { message: response.data.message };
  },
};
