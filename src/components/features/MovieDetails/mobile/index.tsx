import type { Movie } from '../../../../types';
import { formatCurrency, formatDate, formatDuration } from '../../../../utils';
import { Button } from '../../../ui/Button';
import { RatingCircle } from '../../../ui/RatingCircle';
import { Card } from '../Card';
import { MovieTrailer } from '../MovieTrailer';

interface Props {
  movie: Movie;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const MovieDetailsMobileContent = ({
  movie,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-start justify-start gap-3">
      <div className="mx-auto w-full flex items-center justify-center mt-3">
        <img
          src={movie.poster_path}
          alt={movie.title}
          className=" max-w-[300px] object-cover rounded-sm shadow-sm"
        />
      </div>
      <div className="flex gap-2 w-full px-2">
        {onDelete && (
          <Button variant="secondary" onClick={onDelete} className="w-1/2">
            Deletar
          </Button>
        )}
        {onEdit && (
          <Button variant="primary" onClick={onEdit} className="w-full">
            Editar
          </Button>
        )}
      </div>
      <div className="flex flex-col justify-center items-center gap-0.5 w-full">
        <h1 className="montserrat text-2xl font-semibold text-[var(--foreground)]">
          {movie.title}
        </h1>
        <h2 className="montserrat text-sm font-normal text-[var(--foreground)]">
          {movie.original_title}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 items-center justify-between gap-2 sm:gap-3 w-full px-2 mb-5">
        <div className="cols-span-1 sm:col-span-2">
          <Card
            title="Class. Indicativa"
            content={
              movie.indicative_rating === 'L' ||
              movie.indicative_rating === 'Livre'
                ? movie.indicative_rating
                : `${movie.indicative_rating} anos`
            }
            textSize="text-sm"
            width="w-full"
          />
        </div>
        <Card
          width="w-full"
          title="Votos"
          content={movie.vote_count || 0}
          textSize="text-sm"
        />
        <div className="my-14">
          <RatingCircle rating={movie.vote_average * 10} size="small" />
        </div>
      </div>

      <div className="w-full mt-1 px-4">
        <Card title="Sinopse" content={movie.overview} textSize="text-sm" />
      </div>

      <div className="w-full mt-1 px-4">
        <div className="p-4 bg-gradient-to-r from-[#232225] to-[#23222599] rounded-sm flex flex-col items-start justify-center gap-2">
          <h1 className="montserrat font-bold text-[var(--dialog-title)] uppercase">
            Gêneros
          </h1>
          {movie.genres && movie.genres.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre, idx) => (
                <span
                  key={idx}
                  className="montserrat text-sm font-semibold text-[var(--foreground)] px-3 py-1 bg-[var(--secondary-hover)] rounded-xs"
                >
                  {genre}
                </span>
              ))}
            </div>
          ) : (
            <span className="montserrat text-sm font-normal text-[var(--foreground)]">
              Sem gêneros
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 w-full gap-2 mt-1 px-4">
        <div className="col-span-1">
          <Card
            title="Lançamento"
            content={formatDate(movie.release_date)}
            textSize="text-sm"
          />
        </div>
        <div className="col-span-1">
          <Card
            title="Duração"
            content={formatDuration(movie.duration || 0)}
            textSize="text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 w-full gap-2 mt-1 px-4">
        <div className="col-span-1">
          <Card
            title="Situação"
            content={movie.situation || 'Lançado'}
            textSize="text-sm"
          />
        </div>
        <div className="col-span-1">
          <Card
            title="Idioma"
            content={
              movie.original_language === 'en-US'
                ? 'Inglês'
                : movie.original_language
            }
            textSize="text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 w-full gap-2 mt-1 px-4">
        <div className="col-span-1">
          <Card
            title="Orçamento"
            content={movie.budget > 0 ? formatCurrency(movie.budget) : 'N/A'}
            textSize="text-sm"
          />
        </div>
        <div className="col-span-1">
          <Card
            title="Receita"
            content={movie.revenue > 0 ? formatCurrency(movie.revenue) : 'N/A'}
            textSize="text-sm"
          />
        </div>
        <Card
          title="Lucro"
          content={movie.profit > 0 ? formatCurrency(movie.profit) : 'N/A'}
          textSize="text-sm"
        />
      </div>
      <div className="w-full">
        <MovieTrailer trailerUrl={movie.trailer} title={movie.title} />
      </div>
    </div>
  );
};
