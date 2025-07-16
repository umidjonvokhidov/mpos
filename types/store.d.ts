declare interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (isAuthenticated: boolean, user: User) => void;
  fetchUser: () => Promise<User | undefined>;
  fetchRefreshToken: () => Promise<boolean>;
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
}

declare interface NotificationStore {
  notifications: Notification[] | null;
  fetchNotifications: (id: string) => Promise<Notification[] | undefined>;
  markNotificationRead: (id: string, userID: string) => Promise<boolean>;
  markAllNotificationsRead: (id: string) => Promise<boolean>;
}
declare interface UIStore {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}
