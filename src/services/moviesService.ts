import type { GetMoviesQuery, Movie, MovieDTO, MoviesResponse } from '../types';
import { movieApi } from './moviesApi';

export const getMovies = async ({
  page = 1,
  genre,
  startDate,
  endDate,
  minRating,
  minDuration,
  maxDuration,
  sortBy = 'popularity',
  search,
}: GetMoviesQuery): Promise<MoviesResponse> => {
  try {
    const response = await movieApi.getMovies({
      page,
      genre,
      startDate,
      endDate,
      minRating,
      minDuration,
      maxDuration,
      sortBy,
      search,
    });

    return response;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const getMovieById = async (id: string): Promise<Movie> => {
  try {
    const response = await movieApi.getMovieById(id);
    return response;
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    throw error;
  }
};

export const createMovie = async (
  movieData: MovieDTO
): Promise<{ message: string; movie: Movie }> => {
  try {
    const response = await movieApi.createMovie(movieData);
    return response;
  } catch (error) {
    console.error('Error creating movie:', error);
    throw error;
  }
};

export const updateMovie = async (
  id: string,
  movieData: Partial<MovieDTO>
): Promise<{ message: string; movie: Movie }> => {
  try {
    const response = await movieApi.updateMovie(id, movieData);
    return response;
  } catch (error) {
    console.error('Error updating movie:', error);
    throw error;
  }
};

export const deleteMovie = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await movieApi.deleteMovie(id);
    return response;
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};
