/**
 * Tipos da API e estados da aplicação
 */

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  loading: boolean
}

export interface PaginatedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface ApiError {
  status_code: number
  status_message: string
  success: boolean
}

/**
 * Estados de carregamento para melhor UX
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

/**
 * Configurações da aplicação
 */
export interface AppConfig {
  apiKey: string
  baseUrl: string
  imageBaseUrl: string
  defaultLanguage: string
  defaultRegion: string
}

/**
 * Filtros de busca
 */
export interface MovieFilters {
  query?: string
  genre?: number
  year?: number
  sortBy?: 'popularity.desc' | 'popularity.asc' | 'release_date.desc' | 'release_date.asc' | 'vote_average.desc' | 'vote_average.asc'
  page?: number
}

/**
 * Tema da aplicação
 */
export type Theme = 'light' | 'dark' | 'system'

/**
 * Tipos de view para layouts responsivos
 */
export type ViewMode = 'grid' | 'list'