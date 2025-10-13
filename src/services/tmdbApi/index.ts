import axios from 'axios';
import type { GenresResponse, PopularMoviesResponse } from '../../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const tmdbApi = {
  popular: async (page: number = 1): Promise<PopularMoviesResponse> => {
    const response = await api.get(`/movies/popular?page=${page}`);
    return response.data;
  },

  searchMovies: async (query: string, page: number = 1): Promise<any> => {
    const response = await api.get(
      `/movies/search?query=${encodeURIComponent(query)}&page=${page}`
    );
    return response.data;
  },

  getMovieDetails: async (id: string): Promise<any> => {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  },

  getMovieGenres: async (): Promise<GenresResponse> => {
    const response = await api.get(`/movies/genres`);
    return response.data;
  },
};
