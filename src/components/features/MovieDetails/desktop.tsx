import { useSidebar } from '../../../hooks/useSidebar';
import type { Movie, MovieDTO } from '../../../types/movies';
import { Sidebar } from '../../ui/Sidebar';
import MovieForm from '../MovieForm';
import { MovieHeader } from './MovieHeader';
import { MovieTrailer } from './MovieTrailer';

interface MovieDetailsProps {
  isOpenSidebar: boolean;
  movie: Movie;
  closeSidebar: () => void;
  onSubmitEditMovie: (updatedMovie: MovieDTO) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const MovieDetailsDesktop = ({
  movie,
  isOpenSidebar,
  closeSidebar,
  onEdit,
  onDelete,
  onSubmitEditMovie,
}: MovieDetailsProps) => {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col gap-10">
      <MovieHeader movie={movie} onEdit={onEdit} onDelete={onDelete} />

      <div className="container mx-auto mt-10">
        {movie.trailer && (
          <div className="w-full mx-auto">
            <MovieTrailer trailerUrl={movie.trailer} title={movie.title} />
          </div>
        )}
      </div>
      <Sidebar
        title="Adicionar Filme"
        isOpen={isOpenSidebar}
        onClose={closeSidebar}
      >
        <MovieForm
          initialData={movie}
          onCloseSidebar={closeSidebar}
          onSubmit={onSubmitEditMovie}
        />
      </Sidebar>
    </div>
  );
};
