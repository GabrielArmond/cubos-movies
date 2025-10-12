import './App.css';
import { Footer } from './components/features/Footer.tsx';
import { NavBar } from './components/features/Navbar.tsx';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavBar />
      <main className="container mx-auto p-4 flex-1">
        <h1 className="text-2xl font-bold mb-4">Cubos Movies</h1>
        <p className="text-muted-foreground">
          Bem-vindo ao seu app de filmes! Use o botão no canto superior direito
          para alternar entre modo claro e escuro.
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default App;
