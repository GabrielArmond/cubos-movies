export interface Movie {
  id: string;
  title: string;
  original_title: string;
  original_language: string;
  overview: string;
  release_date: string;
  genres: string[];
  vote_average: number;
  vote_count: number;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  situation: string;
  duration: number;
  budget: number;
  revenue: number;
  profit: number;
  trailer: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MoviesResponse {
  results: Movie[];
  totalResults: number;
  totalPages: number;
  page: number;
}

export interface MovieDTO {
  title: string;
  original_title?: string;
  original_language?: string;
  overview: string;
  release_date: string;
  genres?: string[];
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  poster_path?: string;
  backdrop_path?: string;
  situation?: string;
  duration?: number;
  budget: number;
  revenue: number;
  trailer?: string;
}

export interface MovieParams {
  id: string;
}

export interface GetMoviesQuery {
  page?: string;
  limit?: string;
  genre?: string;
  releaseYear?: string;
  minRating?: string;
  sortBy?: 'title' | 'release_date' | 'vote_average' | 'popularity';
  search?: string;
}
