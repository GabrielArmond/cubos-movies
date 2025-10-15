import { useState, useEffect } from 'react';
import type { Movie } from '../../../../types/movies';
import { formatCurrency, formatDate, formatDuration } from '../../../../utils';
import { Button } from '../../../ui/Button';
import { RatingCircle } from '../../../ui/RatingCircle';
import { Card } from '../Card';

interface MovieHeaderProps {
  movie: Movie;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const MovieHeader = ({ movie, onEdit, onDelete }: MovieHeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    checkTheme();
    const interval = setInterval(checkTheme, 100);

    return () => clearInterval(interval);
  }, []);

  const gradientColors = isDarkMode
    ? 'rgba(18, 17, 19, 1) 0%, rgba(18, 17, 19, 0.8) 60%, rgba(18, 17, 19, 0) 100%'
    : 'rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 60%, rgba(255, 255, 255, 0) 100%';

  return (
    <div className="w-full mx-auto relative">
      <div
        className="overflow-hidden mx-auto rounded-b-lg shadow-lg"
        style={{
          backgroundImage: `
          linear-gradient(to right,
            ${gradientColors})${
              movie.backdrop_path
                ? `,
          url(${movie.backdrop_path})`
                : ''
            }`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: movie.backdrop_path ? 'transparent' : '#4a5568',
          minHeight: '500px',
          maxHeight: '510px',
        }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between p-6">
            <div className="flex flex-col gap-0.2 items-start justify-center">
              <h1 className="text-3xl font-semibold montserrat text-[var(--foreground)]">
                {movie.title}
              </h1>
              <h2 className="text-base font-normal montserrat text-[var(--foreground)]">
                Título original: {movie.original_title}
              </h2>
            </div>

            <div className="flex gap-2">
              {onDelete && (
                <Button variant="secondary" onClick={onDelete}>
                  Deletar
                </Button>
              )}
              {onEdit && (
                <Button variant="primary" onClick={onEdit}>
                  Editar
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="absolute top-24 left-14 mt-1">
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="w-[300px] h-[450px] object-cover rounded-sm shadow-sm"
          />
        </div>

        <div className="absolute top-24 right-44 flex items-center gap-6">
          <Card
            title="Classificação Indicativa"
            content={
              movie.indicative_rating === 'L' ||
              movie.indicative_rating === 'Livre'
                ? movie.indicative_rating
                : `${movie.indicative_rating} anos`
            }
            width="max-w-sm"
            textSize="text-sm"
          />
          <Card
            title="Votos"
            content={movie.vote_count || 0}
            width="max-w-sm"
            textSize="text-sm"
          />
          <div className="ml-10">
            <RatingCircle rating={movie.vote_average * 10} size="small" />
          </div>
        </div>

        <div className="absolute top-44 right-[170px] flex gap-4 mt-4">
          <Card
            title="Lançamento"
            content={formatDate(movie.release_date)}
            width="w-[200px]"
            textSize="text-sm"
          />
          <Card
            title="Duração"
            content={formatDuration(movie.duration || 0)}
            width="w-[200px]"
            textSize="text-sm"
          />
        </div>

        <div className="absolute top-24 left-96 mt-1">
          <Card
            title="Sinopse"
            content={movie.overview}
            width="max-w-md"
            textSize="text-sm"
          />
        </div>

        <div className="absolute bottom-32 right-40 flex gap-6">
          <Card
            title="Situação"
            content={movie.situation || 'Lançado'}
            width="w-[200px]"
            textSize="text-sm"
          />
          <Card
            title="Idioma"
            content={
              movie.original_language === 'en-US'
                ? 'Inglês'
                : movie.original_language
            }
            width="w-[200px]"
            textSize="text-sm"
          />
        </div>

        <div className="absolute bottom-6 right-38 flex gap-6">
          <Card
            title="Orçamento"
            width="w-[128px]"
            content={movie.budget > 0 ? formatCurrency(movie.budget) : 'N/A'}
          />

          <Card
            title="Receita"
            width="w-[128px]"
            content={movie.revenue > 0 ? formatCurrency(movie.revenue) : 'N/A'}
          />

          <Card
            title="Lucro"
            width="w-[128px]"
            content={movie.profit > 0 ? formatCurrency(movie.profit) : 'N/A'}
          />
        </div>
      </div>
    </div>
  );
};
