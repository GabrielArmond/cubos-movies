import { useState } from 'react';
import { Button } from './Button';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  return (
    <Button
      variant="secondary"
      size="md"
      onClick={toggleTheme}
      className="!px-5"
    >
      {theme === 'dark' ? (
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
  );
};
