import { useAuthStore } from './auth.store';
import { useUIStore } from './ui.store';

export { useAuthStore } from './auth.store';
export { useUIStore } from './ui.store';

export const useAuth = () => {
  const user = useAuthStore((state: AuthStore) => state.user);
  const isAuthenticated = useAuthStore((state: AuthStore) => state.isAuthenticated);
  const setUser = useAuthStore((state: AuthStore) => state.setUser);
  const fetchUser = useAuthStore((state: AuthStore) => state.fetchUser);
  const fetchRefreshToken = useAuthStore((state: AuthStore) => state.fetchRefreshToken);
  const logout = useAuthStore((state: AuthStore) => state.logout);
  const login = useAuthStore((state: AuthStore) => state.login);
  const register = useAuthStore((state: AuthStore) => state.register);
  const forgotPassword = useAuthStore((state: AuthStore) => state.forgotPassword);
  const verifyOTP = useAuthStore((state: AuthStore) => state.verifyOTP);
  const resetPassword = useAuthStore((state: AuthStore) => state.resetPassword);

  return {
    user,
    isAuthenticated,
    setUser,
    fetchUser,
    fetchRefreshToken,
    logout,
    login,
    register,
    forgotPassword,
    verifyOTP,
    resetPassword,
  };
};

// Custom hook to get UI state
export const useUI = () => {
  const isLoading = useUIStore((state: UIStore) => state.isLoading);
  const setIsLoading = useUIStore((state: UIStore) => state.setIsLoading);

  return {
    isLoading,
    setIsLoading,
  };
};
