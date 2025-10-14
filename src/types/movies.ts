export interface Movie {
  id: number;
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
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenresResponse {
  genres: Genre[];
}

export interface GetMoviesQuery {
  page?: number;
  limit?: string;
  genre?: string;
  releaseYear?: string;
  minRating?: string;
  sortBy?: 'title' | 'release_date' | 'vote_average' | 'popularity';
  search?: string;
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
