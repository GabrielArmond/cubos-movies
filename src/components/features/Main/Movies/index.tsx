import type { Movie } from '../../../../types';
import { MovieCard } from '../../../ui/MovieCard';
import { Pagination } from '../pagination';
import { LoadingSkeleton } from './loadingSkeleton';

interface Props {
  movies: Movie[];
  totalPages?: number;
  loading?: boolean;
  handlePageChange: (page: number) => void;
}

export const MoviesSection = ({
  movies,
  loading,
  totalPages,
  handlePageChange,
}: Props) => {
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center gap-3 w-full backdrop-blur-sm bg-[var(--background-movies)]/80 rounded-sm px-6 py-8 mt-5">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              genres={movie.genres}
            />
          ))
        )}
      </section>
      <section className="w-full flex-grow flex items-end justify-center mt-6">
        <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
      </section>
    </div>
  );
};
