import { useAuthStore } from './auth.store';
import { useUIStore } from './ui.store';
import { useNotificationStore } from './notification.store';
import { useProductStore } from './products.store';
import useCartStore from './cart.store';
import { useTransactionStore } from './transaction.store';

export const useAuth = () => {
  const user = useAuthStore((state: AuthStore) => state.user);
  const isAuthenticated = useAuthStore((state: AuthStore) => state.isAuthenticated);
  const setUser = useAuthStore((state: AuthStore) => state.setUser);
  const fetchUser = useAuthStore((state: AuthStore) => state.fetchUser);
  const logout = useAuthStore((state: AuthStore) => state.logout);
  const login = useAuthStore((state: AuthStore) => state.login);
  const register = useAuthStore((state: AuthStore) => state.register);
  const forgotPassword = useAuthStore((state: AuthStore) => state.forgotPassword);
  const verifyOTP = useAuthStore((state: AuthStore) => state.verifyOTP);
  const resetPassword = useAuthStore((state: AuthStore) => state.resetPassword);
  const updateUser = useAuthStore((state: AuthStore) => state.updateUser);
  const updateUserSettings = useAuthStore((state: AuthStore) => state.updateUserSettings);

  return {
    user,
    isAuthenticated,
    setUser,
    fetchUser,
    logout,
    login,
    register,
    forgotPassword,
    verifyOTP,
    resetPassword,
    updateUser,
    updateUserSettings
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
  const updateProduct = useProductStore((state: ProductStore) => state.updateProduct);
  const deleteProduct = useProductStore((state: ProductStore) => state.deleteProduct);

  return {
    products,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export const useCart = () => {
  const cart = useCartStore((state: CartStore) => state.cart);
  const cartProperties = useCartStore((state: CartStore) => state.cartProperties);
  const fetchCart = useCartStore((state: CartStore) => state.fetchCart);
  const addToCart = useCartStore((state: CartStore) => state.addToCart);
  const removeFromCart = useCartStore((state: CartStore) => state.removeFromCart);
  const clearCart = useCartStore((state: CartStore) => state.clearCart);
  const deleteFromCart = useCartStore((state: CartStore) => state.deleteFromCart);
  const confirmCartProperties = useCartStore((state: CartStore) => state.confirmCartProperties);
  const setCartProperties = useCartStore((state: CartStore) => state.setCartProperties);
  const clearCartProperties = useCartStore((state: CartStore) => state.clearCartProperties);
  const checkoutCart = useCartStore((state: CartStore) => state.checkoutCart);

  return {
    cart,
    cartProperties,
    setCartProperties,
    clearCartProperties,
    fetchCart,
    checkoutCart,
    addToCart,
    removeFromCart,
    clearCart,
    deleteFromCart,
    confirmCartProperties,
  };
};

export const useTransaction = () => {
  const transactions = useTransactionStore((state: TransactionStore) => state.transactions);
  const fetchAllTransactions = useTransactionStore(
    (state: TransactionStore) => state.fetchAllTransactions,
  );
  const fetchUserTransactions = useTransactionStore(
    (state: TransactionStore) => state.fetchUserTransactions,
  );
  const fetchAllTransactionReports = useTransactionStore(
    (state: TransactionStore) => state.fetchAllTransactionReports,
  );
  const fetchUserTransactionReports = useTransactionStore(
    (state: TransactionStore) => state.fetchUserTransactionReports,
  );
  const getTransaction = useTransactionStore((state: TransactionStore) => state.getTransaction);

  return {
    transactions,
    fetchAllTransactions,
    fetchUserTransactions,
    fetchAllTransactionReports,
    fetchUserTransactionReports,
    getTransaction,
  };
};
