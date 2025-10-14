import { useCallback, useEffect, useState } from 'react';
import { Filters } from '../Filters';
import { MoviesSection } from './Movies';
import type { Movie, MovieDTO } from '../../../types';
import { Dialog } from '../../ui/Dialog';
import { Button } from '../../ui/Button';
import { useFilterDialog } from '../../../hooks/useFilterDialog';
import { MovieFilters, type MovieFiltersOption } from './filters';
import { createMovie, getMovies } from '../../../services/moviesService';
import { useSidebar } from '../../../hooks/useSidebar';
import { Sidebar } from '../../ui/Sidebar';
import MovieForm from '../MovieForm';

const DEFAULT_FILTERS: MovieFiltersOption = {
  genre: '',
  startDate: '',
  endDate: '',
  minRating: '',
  minDuration: '',
  maxDuration: '',
  sortBy: 'popularity',
};

const SEARCH_DEBOUNCE_DELAY = 500;

export const Main = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingNewMovie, setLoadingNewMovie] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const [appliedFilters, setAppliedFilters] =
    useState<MovieFiltersOption>(DEFAULT_FILTERS);
  const [tempFilters, setTempFilters] =
    useState<MovieFiltersOption>(DEFAULT_FILTERS);

  const { isOpen, closeDialog, openDialog } = useFilterDialog();

  const { openSidebar, closeSidebar, isOpenSidebar } = useSidebar();

  const fetchMovies = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        const response = await getMovies({
          page: page,
          search: debouncedSearchTerm || undefined,
          genre: appliedFilters.genre || undefined,
          startDate: appliedFilters.startDate || undefined,
          endDate: appliedFilters.endDate || undefined,
          minRating: appliedFilters.minRating || undefined,
          minDuration: appliedFilters.minDuration || undefined,
          maxDuration: appliedFilters.maxDuration || undefined,
          sortBy: appliedFilters.sortBy,
        });

        setMovies(response.results);
        setTotalPages(response.totalPages);
        setCurrentPage(response.page);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    },
    [debouncedSearchTerm, appliedFilters]
  );

  const handleSearch = useCallback((query: string) => {
    setSearchTerm(query);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleFiltersChange = useCallback((newFilters: MovieFiltersOption) => {
    setTempFilters(newFilters);
  }, []);

  const handleOpenFiltersDialog = useCallback(() => {
    setTempFilters(appliedFilters);
    openDialog();
  }, [appliedFilters, openDialog]);

  const handleOpenSidebar = useCallback(() => {
    openSidebar();
  }, [openSidebar]);

  const handleApplyFilters = useCallback(() => {
    setAppliedFilters(tempFilters);
    setCurrentPage(1);
    closeDialog();
  }, [tempFilters, closeDialog]);

  const handleClearFilters = useCallback(() => {
    setTempFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
  }, []);

  const handleCancelFilters = useCallback(() => {
    setTempFilters(appliedFilters);
    closeDialog();
  }, [appliedFilters, closeDialog]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, SEARCH_DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, appliedFilters]);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [fetchMovies, currentPage]);

  const onSubmitNewMovie = async (movie: MovieDTO) => {
    setLoadingNewMovie(true);
    try {
      await createMovie(movie);
      closeSidebar();
      fetchMovies(1);
    } catch (error) {
      console.error('Erro ao criar filme:', error);
    } finally {
      setLoadingNewMovie(false);
    }
  };

  return (
    <main className="container mx-auto gap-2 p-4 flex-1">
      <Filters
        onSearch={handleSearch}
        onOpenFilters={handleOpenFiltersDialog}
        onOpenAddMovie={handleOpenSidebar}
      />
      {movies.length > 0 ? (
        <MoviesSection
          loading={loading}
          movies={movies}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      ) : (
        <div className="flex items-center justify-center mt-20 p-5">
          <h1 className="text-2xl">Nenhum filme disponível... :(</h1>
        </div>
      )}

      <Dialog
        isOpen={isOpen}
        onClose={handleCancelFilters}
        title="Filtros"
        size="lg"
      >
        <MovieFilters
          onHandleFilterChange={handleFiltersChange}
          initialFilters={tempFilters}
        />
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2 mt-8">
          <Button variant="link" onClick={handleClearFilters}>
            Limpar Filtros
          </Button>

          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={handleCancelFilters}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              className="min-w-40"
              onClick={handleApplyFilters}
            >
              Aplicar filtros
            </Button>
          </div>
        </div>
      </Dialog>

      <Sidebar
        title="Adicionar Filme"
        isOpen={isOpenSidebar}
        onClose={closeSidebar}
      >
        <MovieForm
          loading={loadingNewMovie}
          onCloseSidebar={closeSidebar}
          onSubmit={onSubmitNewMovie}
        />
      </Sidebar>
    </main>
  );
};
