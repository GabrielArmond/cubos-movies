import { useState } from 'react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

interface Props {
  onSearch: (query: string) => void;
  onOpenFilters: () => void;
  onOpenAddMovie: () => void;
}

export const Filters = ({ onSearch, onOpenFilters, onOpenAddMovie }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <section className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-3">
      <div className="w-full max-w-96">
        <Input
          placeholder="Pesquise por filmes"
          icon={
            <img
              src="/src/assets/icons/search.svg"
              alt="Buscar"
              className="h-5 w-5 dark:brightness-0 dark:invert"
            />
          }
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-row items-center justify-center gap-2 w-full sm:w-auto">
        <Button
          variant="secondary"
          className="w-32 max-w-40 text-base"
          onClick={onOpenFilters}
        >
          Filtros
        </Button>
        <Button
          variant="primary"
          size="md"
          className="w-52 max-w-md"
          onClick={onOpenAddMovie}
        >
          Adicionar Filme
        </Button>
      </div>
    </section>
  );
};
