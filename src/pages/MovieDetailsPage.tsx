import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import type { Movie, MovieDTO } from '../types/movies';
import { MovieDetailsDesktop } from '../components/features/MovieDetails/desktop';
import {
  getMovieById,
  deleteMovie,
  updateMovie,
} from '../services/moviesService';
import { useSidebar } from '../hooks/useSidebar';

export const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  const { openSidebar, closeSidebar, isOpenSidebar } = useSidebar();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchMovie = async () => {
    if (!id) {
      setError('ID do filme não fornecido');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const movieData = await getMovieById(id);
      setMovie(movieData);
    } catch (err) {
      console.error('Erro ao buscar filme:', err);
      setError('Erro ao carregar detalhes do filme');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const handleEdit = () => {
    openSidebar();
  };

  const handleDelete = async () => {
    if (!id || !movie) return;

    const confirmed = window.confirm(
      `Tem certeza que deseja deletar o filme "${movie.title}"?`
    );

    if (confirmed) {
      try {
        await deleteMovie(id);
        navigate('/');
      } catch (err) {
        console.error('Erro ao deletar filme:', err);
        alert('Erro ao deletar filme');
      }
    }
  };

  const handleSubmitEditMovie = async (updatedMovie: MovieDTO) => {
    if (!id || !movie) return;
    try {
      setLoading(true);
      await updateMovie(id, updatedMovie);
      fetchMovie();
    } catch (err) {
      console.error('Erro ao editar filme:', err);
    } finally {
      setLoading(false);
      closeSidebar();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--primary)] mx-auto mb-4"></div>
          <p className="text-[var(--muted-foreground)]">
            Carregando detalhes do filme...
          </p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            {error || 'Filme não encontrado'}
          </h1>
          <button
            onClick={() => navigate('/')}
            className="text-[var(--primary)] hover:text-[var(--primary-hover)] underline"
          >
            Voltar para a lista de filmes
          </button>
        </div>
      </div>
    );
  }

  return isMobile ? (
    <div>isMobile</div>
  ) : (
    <MovieDetailsDesktop
      isOpenSidebar={isOpenSidebar}
      closeSidebar={closeSidebar}
      onSubmitEditMovie={handleSubmitEditMovie}
      movie={movie}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};
