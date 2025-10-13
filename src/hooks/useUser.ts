import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import type { UserContextType } from '../context/UserContext';

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }

  return context;
};
