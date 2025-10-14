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
  indicative_rating: string;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
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
  startDate?: string;
  endDate?: string;
  minRating?: string;
  minDuration?: string;
  maxDuration?: string;
  sortBy?:
    | 'title'
    | 'release_date'
    | 'vote_average'
    | 'popularity'
    | 'duration';
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
  indicative_rating?: string;
}
