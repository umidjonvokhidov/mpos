declare interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  isUserLoading: boolean;
  setUser: (isAuthenticated: boolean, user: User) => void;
  fetchUser: () => Promise<User | undefined>;
  logout: () => Promise<boolean>;
  login: (email: string, password: string, remember?: boolean) => Promise<boolean>;
  register: (
    firstname: string,
    lastname: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  verifyOTP: (otp: string) => Promise<boolean>;
  resetPassword: (newPassword: string) => Promise<boolean>;
  updateUser: (data: any) => Promise<boolean>;
  updateUserSettings: (data: UserSettings) => Promise<boolean>;
}

declare interface NotificationStore {
  notifications: Notification[] | null;
  isNotificationLoading: boolean;
  fetchNotifications: (id: string) => Promise<Notification[] | undefined>;
  markNotificationRead: (id: string, userID: string) => Promise<boolean>;
  markAllNotificationsRead: (id: string) => Promise<boolean>;
}

declare interface ProductStore {
  products: Product[] | null;
  isProductLoading: boolean;
  fetchProducts: () => Promise<Product[] | undefined>;
  createProduct: (data: ProductFormValues) => Promise<boolean>;
  getProduct: (id: string) => Promise<Product | undefined>;
  updateProduct: (id: string, data: ProductFormValues) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
}

declare interface CartStore {
  cart: Cart | null;
  isCartLoading: boolean;
  cartProperties: CartProperties | null;
  fetchCart: () => Promise<Cart>;
  addToCart: (id: string) => Promise<boolean>;
  removeFromCart: (id: string) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  deleteFromCart: (id: string) => Promise<boolean>;
  setCartProperties: () => void;
  confirmCartProperties: (cartProperties: CartProperties) => void;
  clearCartProperties: () => void;
  checkoutCart: () => Promise<string>;
}

declare interface TransactionStore {
  transactions: Transaction[] | [];
  isTransactionLoading: boolean;
  fetchUserTransactions: (user?: User) => Promise<boolean>;
  fetchAllTransactionReports: () => Promise<boolean>;
  fetchUserTransactionReports: (id: string) => Promise<boolean>;
  getTransaction: (id: string) => Promise<Transaction>;
  updateTransactionStatus: (id: string, status: TransactionStatus) => Promise<boolean>;
}
declare interface UIStore {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}
