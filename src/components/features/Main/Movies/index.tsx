import { MovieCard } from '../../../ui/MovieCard';
import { Pagination } from '../pagination';

interface Props {
  movies: any[];
}

export const MoviesSection = ({ movies }: Props) => {
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 justify-items-center gap-3 w-full backdrop-blur-sm bg-[var(--background-movies)]/80 rounded-sm px-6 py-8 mt-5">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            backdropPath={movie.backdropPath}
            genres={['Ação', 'Aventura']}
            progress={movie.progress}
          />
        ))}
      </section>
      <section className="w-full flex-grow flex items-end justify-center mt-6">
        <Pagination
          totalPages={8}
          onPageChange={(page) => console.log('Change to page:', page)}
        />
      </section>
    </div>
  );
};
