import { Filters } from '../Filters';
import { MoviesSection } from './Movies';

const mockMovies = [
  {
    id: 1,
    title: 'Avatar: O Caminho da Água',
    backdropPath: '/src/assets/background.png',
    progress: 70,
  },
  {
    id: 2,
    title: 'Top Gun: Maverick',
    backdropPath: '/src/assets/background.png',
    progress: 30,
  },
  {
    id: 3,
    title: 'Homem-Aranha: Sem Volta Para Casa',
    backdropPath: '/src/assets/background.png',
    progress: 90,
  },
  {
    id: 4,
    title: 'Duna',
    backdropPath: '/src/assets/background.png',
    progress: 10,
  },
  {
    id: 5,
    title: 'Bad Boys Para Sempre',
    backdropPath: '/src/assets/background.png',
    progress: 27,
  },
];

export const Main = () => {
  return (
    <main className="container mx-auto gap-2 p-4 flex-1">
      <Filters />
      <MoviesSection movies={mockMovies} />
    </main>
  );
};
