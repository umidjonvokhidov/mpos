import { useAuthStore } from './auth.store';
import { useUIStore } from './ui.store';
import { useNotificationStore } from './notification.store';
import { useProductStore } from './products.store';

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

export const useUI = () => {
  const isLoading = useUIStore((state: UIStore) => state.isLoading);
  const setIsLoading = useUIStore((state: UIStore) => state.setIsLoading);

  return {
    isLoading,
    setIsLoading,
  };
};

export const useNotification = () => {
  const notifications = useNotificationStore((state: NotificationStore) => state.notifications);
  const fetchNotifications = useNotificationStore(
    (state: NotificationStore) => state.fetchNotifications,
  );
  const markNotificationRead = useNotificationStore(
    (state: NotificationStore) => state.markNotificationRead,
  );
  const markAllNotificationsRead = useNotificationStore(
    (state: NotificationStore) => state.markAllNotificationsRead,
  );

  return {
    notifications,
    fetchNotifications,
    markNotificationRead,
    markAllNotificationsRead,
  };
};

export const useProduct = () => {
  const products = useProductStore((state: ProductStore) => state.products);
  const fetchProducts = useProductStore((state: ProductStore) => state.fetchProducts);
  const createProduct = useProductStore((state: ProductStore) => state.createProduct);

  return {
    products,
    fetchProducts,
    createProduct
  };
};
