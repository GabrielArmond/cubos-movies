import { useState } from 'react';
import { Input } from '../../ui/Input';
import { formatDate } from '../../../utils';

export type MovieFiltersOption = {
  genre: string;
  startDate: string;
  endDate: string;
  minRating: string;
  minDuration: string;
  maxDuration: string;
  sortBy: 'popularity' | 'title' | 'release_date' | 'vote_average' | 'duration';
};

interface Props {
  onHandleFilterChange: (filters: MovieFiltersOption) => void;
  initialFilters?: MovieFiltersOption;
}

export function MovieFilters({ onHandleFilterChange, initialFilters }: Props) {
  const [filters, setFilters] = useState<MovieFiltersOption>(
    initialFilters || {
      genre: '',
      startDate: '',
      endDate: '',
      minRating: '',
      minDuration: '',
      maxDuration: '',
      sortBy: 'popularity',
    }
  );

  const handleFilterChange = (filterName: string, value: string) => {
    const newFilters = {
      ...filters,
      [filterName]: value,
    };
    setFilters(newFilters);

    onHandleFilterChange(newFilters);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-left font-medium text-gray-700 dark:text-gray-300 mb-2">
          Gênero
        </label>
        <select
          value={filters.genre}
          onChange={(e) => handleFilterChange('genre', e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-[var(--border)] rounded-lg bg-white dark:bg-[var(--input)] text-gray-900 dark:text-white"
        >
          <option value="">Todos os gêneros</option>
          <option value="ação">Ação</option>
          <option value="aventura">Aventura</option>
          <option value="comédia">Comédia</option>
          <option value="drama">Drama</option>
          <option value="terror">Terror</option>
          <option value="romance">Romance</option>
          <option value="ficção científica">Ficção Científica</option>
          <option value="thriller">Thriller</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-left font-medium text-gray-700 dark:text-gray-300 mb-2">
          Período de Lançamento
        </label>
        <div className="flex items-center space-x-3">
          <Input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
            className="flex-1"
            placeholder="Data inicial"
          />
          <span className="text-sm text-gray-500 dark:text-gray-400">até</span>
          <Input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
            className="flex-1"
            placeholder="Data final"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-left  font-medium text-gray-700 dark:text-gray-300 mb-2">
          Avaliação Mínima
        </label>
        <div className="flex items-center space-x-3">
          <Input
            type="number"
            placeholder="0.0"
            value={filters.minRating}
            onChange={(e) => handleFilterChange('minRating', e.target.value)}
            min="0"
            max="10"
            step="0.1"
            className="flex-1"
          />
          <span className="text-sm text-gray-500 dark:text-gray-400">/ 10</span>
        </div>
      </div>

      <div>
        <label className="block text-sm text-left font-medium text-gray-700 dark:text-gray-300 mb-2">
          Duração (minutos)
        </label>
        <div className="flex items-center space-x-3">
          <Input
            type="number"
            placeholder="Min"
            value={filters.minDuration}
            onChange={(e) => handleFilterChange('minDuration', e.target.value)}
            min="1"
            max="999"
            className="flex-1"
          />
          <span className="text-sm text-gray-500 dark:text-gray-400">até</span>
          <Input
            type="number"
            placeholder="Max"
            value={filters.maxDuration}
            onChange={(e) => handleFilterChange('maxDuration', e.target.value)}
            min="1"
            max="999"
            className="flex-1"
          />
          <span className="text-sm text-gray-500 dark:text-gray-400">min</span>
        </div>
      </div>

      <div>
        <label className="block text-sm text-left  font-medium text-gray-700 dark:text-gray-300 mb-2">
          Ordenar por
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="w-full p-3 border border-gray-300 text-gray-900 dark:text-white dark:border-[var(--border)] rounded-lg bg-white dark:bg-[var(--input)]"
        >
          <option value="popularity">Mais Popular</option>
          <option value="release_date">Data de Lançamento</option>
          <option value="vote_average">Melhor Avaliado</option>
          <option value="title">Título (A-Z)</option>
          <option value="duration">Duração</option>
        </select>
      </div>

      {(filters.genre ||
        filters.startDate ||
        filters.endDate ||
        filters.minRating ||
        filters.minDuration ||
        filters.maxDuration ||
        filters.sortBy !== 'popularity') && (
        <div className="bg-gray-50 dark:bg-[var(--secondary)] p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filtros Ativos:
          </h4>
          <div className="flex flex-wrap gap-2">
            {filters.genre && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                Gênero: {filters.genre}
              </span>
            )}
            {(filters.startDate || filters.endDate) && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                Período: {formatDate(filters.startDate) || '...'} até{' '}
                {formatDate(filters.endDate) || '...'}
              </span>
            )}
            {filters.minRating && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">
                Avaliação: {filters.minRating}+
              </span>
            )}
            {filters.minDuration && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full">
                Min: {filters.minDuration}min
              </span>
            )}
            {filters.maxDuration && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full">
                Max: {filters.maxDuration}min
              </span>
            )}
            {filters.sortBy !== 'popularity' && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                Ordenação: {filters.sortBy}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
