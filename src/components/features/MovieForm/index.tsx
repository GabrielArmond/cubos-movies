import React, { useState, type FormEvent } from 'react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import type { MovieDTO } from '../../../types/movies';
import { uploadMovieImages } from '../../../services/uploadService';

interface MovieFormProps {
  onCloseSidebar: () => void;
  onSubmit: (movieData: MovieDTO) => void | Promise<void>;
  loading?: boolean;
  initialData?: Partial<MovieDTO>;
}

export const MovieForm: React.FC<MovieFormProps> = ({
  onCloseSidebar,
  onSubmit,
  loading = false,
  initialData = {},
}) => {
  const [formData, setFormData] = useState<MovieDTO>({
    title: initialData.title || '',
    original_title: initialData.original_title || '',
    original_language: initialData.original_language || '',
    overview: initialData.overview || '',
    release_date: initialData.release_date || '',
    genres: initialData.genres || [],
    vote_average: initialData.vote_average || 0,
    vote_count: initialData.vote_count || 0,
    popularity: initialData.popularity || 0,
    poster_path: initialData.poster_path || '',
    backdrop_path: initialData.backdrop_path || '',
    situation: initialData.situation || '',
    duration: initialData.duration || 0,
    budget: initialData.budget || 0,
    revenue: initialData.revenue || 0,
    trailer: initialData.trailer || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [genreInput, setGenreInput] = useState('');
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [backdropFile, setBackdropFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string>('');
  const [backdropPreview, setBackdropPreview] = useState<string>('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    let convertedValue: string | number = value;
    if (
      [
        'vote_average',
        'vote_count',
        'popularity',
        'duration',
        'budget',
        'revenue',
      ].includes(name)
    ) {
      const numericValue = value === '' ? 0 : Number(value);
      convertedValue = numericValue < 0 ? 0 : numericValue;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: convertedValue,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleAddGenre = () => {
    if (genreInput.trim() && !formData.genres?.includes(genreInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        genres: [...(prev.genres || []), genreInput.trim()],
      }));
      setGenreInput('');
    }
  };

  const handleRemoveGenre = (genreToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres?.filter((genre) => genre !== genreToRemove) || [],
    }));
  };

  const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPosterFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPosterPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    if (errors.poster_path) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.poster_path;
        return newErrors;
      });
    }
  };

  const handleBackdropUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBackdropFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setBackdropPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    if (errors.backdrop_path) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.backdrop_path;
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }

    if (!formData.overview.trim()) {
      newErrors.overview = 'Sinopse é obrigatória';
    }

    if (!formData.release_date) {
      newErrors.release_date = 'Data de lançamento é obrigatória';
    }

    if (formData.budget < 0) {
      newErrors.budget = 'Orçamento não pode ser negativo';
    }

    if (formData.revenue < 0) {
      newErrors.revenue = 'Receita não pode ser negativa';
    }

    if (
      formData.vote_average &&
      (formData.vote_average < 0 || formData.vote_average > 10)
    ) {
      newErrors.vote_average = 'Nota deve estar entre 0 e 10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      let finalFormData = { ...formData };

      const movieId = initialData.title
        ? initialData.title
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
        : formData.title
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-') +
          '-' +
          Date.now();

      if (posterFile || backdropFile) {
        try {
          const uploadResults = await uploadMovieImages(
            posterFile,
            backdropFile,
            movieId
          );

          if (uploadResults.posterUrl) {
            finalFormData.poster_path = uploadResults.posterUrl;
          }

          if (uploadResults.backdropUrl) {
            finalFormData.backdrop_path = uploadResults.backdropUrl;
          }
        } catch (error) {
          console.error('Erro no upload das imagens:', error);

          if (posterFile && backdropFile) {
            setErrors((prev) => ({
              ...prev,
              poster_path: 'Erro no upload das imagens',
              backdrop_path: 'Erro no upload das imagens',
            }));
          } else if (posterFile) {
            setErrors((prev) => ({
              ...prev,
              poster_path: 'Erro no upload do poster',
            }));
          } else if (backdropFile) {
            setErrors((prev) => ({
              ...prev,
              backdrop_path: 'Erro no upload do backdrop',
            }));
          }
          return;
        }
      }

      await onSubmit(finalFormData);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto px-2">
      <div className="grid grid-cols-1 gap-4 w-full">
        <Input
          label="Título *"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          error={errors.title}
          placeholder="Digite o título do filme"
        />

        <Input
          label="Título Original"
          name="original_title"
          value={formData.original_title}
          onChange={handleInputChange}
          placeholder="Título original (se diferente)"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 w-full">
        <Input
          label="Idioma Original"
          name="original_language"
          value={formData.original_language}
          onChange={handleInputChange}
          placeholder="ex: pt-BR, en-US"
        />

        <Input
          label="Data de Lançamento *"
          name="release_date"
          type="date"
          value={formData.release_date}
          onChange={handleInputChange}
          error={errors.release_date}
        />
      </div>

      <div>
        <label className="block text-left text-sm font-medium text-[var(--foreground)] mb-2">
          Sinopse *
        </label>
        <textarea
          name="overview"
          value={formData.overview}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-3 border rounded-sm bg-[var(--card)] border-[var(--placeholder)] text-[var(--foreground)] placeholder:text-[var(--placeholder)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-vertical"
          placeholder="Digite a sinopse do filme"
        />
        {errors.overview && (
          <p className="text-xs text-error-600 dark:text-error-400 mt-1">
            {errors.overview}
          </p>
        )}
      </div>

      <div>
        <label className="block text-left text-sm font-medium text-[var(--foreground)] mb-2">
          Gêneros
        </label>
        <div className="flex gap-2 mb-2">
          <Input
            value={genreInput}
            onChange={(e) => setGenreInput(e.target.value)}
            placeholder="Digite um gênero"
            className="flex-1"
          />
          <Button type="button" onClick={handleAddGenre} size="md">
            Adicionar
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.genres?.map((genre, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--primary)] text-[var(--foreground)] rounded-full text-sm"
            >
              {genre}
              <button
                type="button"
                onClick={() => handleRemoveGenre(genre)}
                className="ml-1 text-[var(--foreground)] hover:text-red-300"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Nota Média"
          name="vote_average"
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={formData.vote_average}
          onChange={handleInputChange}
          error={errors.vote_average}
          placeholder="0.0"
        />

        <Input
          label="N° de Votos"
          name="vote_count"
          type="number"
          min="0"
          value={formData.vote_count}
          onChange={handleInputChange}
          placeholder="0"
        />

        <Input
          label="Popularidade"
          name="popularity"
          type="number"
          min="0"
          step="0.1"
          value={formData.popularity}
          onChange={handleInputChange}
          placeholder="0.0"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-left text-sm font-medium text-[var(--foreground)] mb-2">
            Poster do Filme
          </label>
          <div className="space-y-2">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handlePosterUpload}
                className="w-full px-6 py-4 border rounded-lg bg-[var(--card)] border-[var(--placeholder)] text-[var(--foreground)] 
                         focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-200
                         file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
                         file:bg-[var(--primary)] file:text-[var(--foreground)] file:font-medium
                         hover:file:bg-[var(--primary-hover)] file:cursor-pointer
                         cursor-pointer hover:bg-[var(--card)]/80"
              />
            </div>
            {(posterPreview || formData.poster_path) && (
              <div className="mt-2">
                <img
                  src={posterPreview || formData.poster_path}
                  alt="Preview do poster"
                  className="w-20 h-28 object-cover rounded border"
                />
                <p className="text-xs text-[var(--primary)]  dark:text-[var(--foreground)] mt-1">
                  {posterPreview ? 'Arquivo selecionado' : 'Poster carregado'}
                </p>
              </div>
            )}
            {errors.poster_path && (
              <p className="text-xs text-error-600 dark:text-error-400">
                {errors.poster_path}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-left text-sm font-medium text-[var(--foreground)] mb-2">
            Backdrop do Filme
          </label>
          <div className="space-y-2">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleBackdropUpload}
                className="w-full px-6 py-4 border rounded-lg bg-[var(--card)] border-[var(--placeholder)] text-[var(--foreground)] 
                         focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-200
                         file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
                         file:bg-[var(--primary)] file:text-[var(--foreground)] file:font-medium
                         hover:file:bg-[var(--primary-hover)] file:cursor-pointer
                         cursor-pointer hover:bg-[var(--card)]/80"
              />
            </div>
            {(backdropPreview || formData.backdrop_path) && (
              <div className="mt-2">
                <img
                  src={backdropPreview || formData.backdrop_path}
                  alt="Preview do backdrop"
                  className="w-32 h-18 object-cover rounded border"
                />
                <p className="text-xs text-[var(--primary)]  dark:text-[var(--foreground)] mt-1">
                  {backdropPreview
                    ? 'Arquivo selecionado'
                    : 'Backdrop carregado'}
                </p>
              </div>
            )}
            {errors.backdrop_path && (
              <p className="text-xs text-error-600 dark:text-error-400">
                {errors.backdrop_path}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Situação"
          name="situation"
          value={formData.situation}
          onChange={handleInputChange}
          placeholder="ex: Lançado, Em produção"
        />

        <Input
          label="Duração (minutos)"
          name="duration"
          type="number"
          min="0"
          value={formData.duration}
          onChange={handleInputChange}
          placeholder="0"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Orçamento (R$) *"
          name="budget"
          type="number"
          min="0"
          value={formData.budget}
          onChange={handleInputChange}
          error={errors.budget}
          placeholder="0"
        />

        <Input
          label="Receita (R$)*"
          name="revenue"
          type="number"
          min="0"
          value={formData.revenue}
          onChange={handleInputChange}
          error={errors.revenue}
          placeholder="0"
        />
      </div>

      <Input
        label="URL do Trailer"
        name="trailer"
        value={formData.trailer}
        onChange={handleInputChange}
        placeholder="https://..."
      />

      <div className="flex justify-end gap-4 pt-6">
        <Button type="button" variant="secondary" onClick={onCloseSidebar}>
          Cancelar
        </Button>
        <Button type="submit" loading={loading} disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Filme'}
        </Button>
      </div>
    </form>
  );
};

export default MovieForm;
