import { useState } from 'react';
import { Input } from '../../ui/Input';

export type MovieFiltersOption = {
  genre: string;
  releaseYear: string;
  minRating: string;
  sortBy: 'popularity' | 'title' | 'release_date' | 'vote_average';
};

interface Props {
  onHandleFilterChange: (filters: MovieFiltersOption) => void;
  initialFilters?: MovieFiltersOption;
}

export function MovieFilters({ onHandleFilterChange, initialFilters }: Props) {
  const [filters, setFilters] = useState<MovieFiltersOption>(
    initialFilters || {
      genre: '',
      releaseYear: '',
      minRating: '',
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
        <label className="block text-sm text-left  font-medium text-gray-700 dark:text-gray-300 mb-2">
          Ano de Lançamento
        </label>
        <Input
          type="number"
          placeholder="Ex: 2023"
          value={filters.releaseYear}
          onChange={(e) => handleFilterChange('releaseYear', e.target.value)}
          min="1900"
          max={new Date().getFullYear()}
        />
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
        </select>
      </div>

      {(filters.genre ||
        filters.releaseYear ||
        filters.minRating ||
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
            {filters.releaseYear && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                Ano: {filters.releaseYear}
              </span>
            )}
            {filters.minRating && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">
                Avaliação: {filters.minRating}+
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
