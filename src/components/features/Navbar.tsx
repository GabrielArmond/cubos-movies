import { useLocation } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { handleLogout } from '../../services/authService';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';

export function NavBar() {
  const { isLoggedIn } = useAuth();
  const { pathname } = useLocation();

  const logout = async () => {
    try {
      handleLogout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const backToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <nav className="bg-background border-b border-gray-400 shadow-sm">
      <div className="w-full flex flex-wrap items-center justify-between p-4">
        <a href="/" className="flex items-center space-x-3">
          <div className="hidden lg:block">
            <img
              src="/src/assets/logo-complete.svg"
              className="h-8"
              alt="Cubos Movies logo"
            />
          </div>
          <div className="lg:hidden block">
            <img
              src="/src/assets/logo.svg"
              className="h-8"
              alt="Cubos Movies logo"
            />
          </div>
          <span className="self-center text-lg md:text-xl font-bold whitespace-nowrap text-foreground inter">
            Movies
          </span>
        </a>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {isLoggedIn && (
            <Button variant="primary" onClick={() => logout()}>
              Logout
            </Button>
          )}

          {!isLoggedIn && pathname === '/register' && (
            <Button variant="primary" onClick={() => backToLogin()}>
              Voltar para Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
