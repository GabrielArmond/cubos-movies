import { useUser } from './useUser';

export const useAuth = () => {
  const { isAuthenticated, user, isLoading } = useUser();

  return {
    isAuthenticated,
    user,
    isLoading,
    isLoggedIn: isAuthenticated && !!user,
  };
};
