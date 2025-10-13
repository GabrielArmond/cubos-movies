import { useEffect, useState } from 'react';
import { getPopularMovies } from '../../../services/tmdbService';
import { Filters } from '../Filters';
import { MoviesSection } from './Movies';
import type { Movie } from '../../../types';

export const Main = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      const response = await getPopularMovies(currentPage);
      setPopularMovies(response.results);
      setTotalPages(response.total_pages);
      setCurrentPage(response.page);
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, [currentPage]);

  return (
    <main className="container mx-auto gap-2 p-4 flex-1">
      <Filters />
      <MoviesSection
        loading={loading}
        movies={popularMovies}
        totalPages={totalPages}
        handlePageChange={setCurrentPage}
      />
    </main>
  );
};
