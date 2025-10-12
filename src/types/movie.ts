/**
 * Tipos relacionados a filmes baseados na API do TMDB
 */

export interface Movie {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  genre_ids: number[]
  adult: boolean
  original_language: string
  popularity: number
  vote_average: number
  vote_count: number
  video: boolean
}

export interface MovieDetails extends Movie {
  genres: Genre[]
  runtime: number | null
  budget: number
  revenue: number
  homepage: string | null
  imdb_id: string | null
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  spoken_languages: SpokenLanguage[]
  status: MovieStatus
  tagline: string | null
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export type MovieStatus = 
  | 'Rumored' 
  | 'Planned' 
  | 'In Production' 
  | 'Post Production' 
  | 'Released' 
  | 'Canceled'

export interface MovieSearchResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface MovieCredits {
  id: number
  cast: CastMember[]
  crew: CrewMember[]
}

export interface CastMember {
  adult: boolean
  gender: number | null
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface CrewMember {
  adult: boolean
  gender: number | null
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  credit_id: string
  department: string
  job: string
}