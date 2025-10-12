import { Button } from '../ui/Button.tsx';
import { useDarkMode } from '../../hooks/useDarkMode.ts';

export function NavBar() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <nav className="bg-background border-b border-gray-400 shadow-sm">
      <div className="w-full flex flex-wrap items-center justify-between p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
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
          <span className="self-center text-xl font-bold whitespace-nowrap text-foreground inter">
            Movies
          </span>
        </a>

        <div className="flex items-center space-x-4">
          <Button
            variant="theme"
            size="md"
            onClick={toggleDarkMode}
            className="!px-5"
          >
            {isDark ? (
              <img
                src="/src/assets/icons/sun.svg"
                className="h-6 brightness-0 invert"
                alt="Ícone de Sol"
              />
            ) : (
              <img
                src="/src/assets/icons/moon.svg"
                className="h-6 dark:brightness-0 dark:invert"
                alt="Ícone de Lua"
              />
            )}
          </Button>
          <Button variant="primary">Logout</Button>
        </div>
      </div>
    </nav>
  );
}
