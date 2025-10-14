import type { Movie, MovieDTO } from '../../../types';
import { Sidebar } from '../../ui/Sidebar';
import MovieForm from '../MovieForm';
import { MovieDetailsMobileContent } from './mobile/index.tsx';

interface MovieDetailsProps {
  isOpenSidebar: boolean;
  movie: Movie;
  closeSidebar: () => void;
  onSubmitEditMovie: (updatedMovie: MovieDTO) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const MovieDetailsMobile = ({
  movie,
  isOpenSidebar,
  closeSidebar,
  onEdit,
  onDelete,
  onSubmitEditMovie,
}: MovieDetailsProps) => {
  return (
    <>
      <MovieDetailsMobileContent
        movie={movie}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <Sidebar
        title="Editar Filme"
        isOpen={isOpenSidebar}
        onClose={closeSidebar}
      >
        <MovieForm
          initialData={movie}
          onCloseSidebar={closeSidebar}
          onSubmit={onSubmitEditMovie}
        />
      </Sidebar>
    </>
  );
};
