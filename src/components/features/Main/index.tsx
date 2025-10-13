import { useEffect, useState } from 'react';
import { getPopularMovies, searchMovies } from '../../../services/tmdbService';
import { Filters } from '../Filters';
import { MoviesSection } from './Movies';
import type { Movie } from '../../../types';

export const Main = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
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

  const fetchMoviesWithSearch = async (query: string) => {
    try {
      setLoading(true);
      const response = await searchMovies(query, 1);
      setPopularMovies(response.results);
      setTotalPages(response.total_pages);
      setCurrentPage(response.page);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = (query: string) => {
    setSearchTerm(query);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.trim() === '') {
      fetchPopularMovies();
    } else {
      fetchMoviesWithSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchPopularMovies();
  }, [currentPage]);

  return (
    <main className="container mx-auto gap-2 p-4 flex-1">
      <Filters onSearch={onSearch} />
      <MoviesSection
        loading={loading}
        movies={popularMovies}
        totalPages={totalPages}
        handlePageChange={setCurrentPage}
      />
    </main>
  );
};
