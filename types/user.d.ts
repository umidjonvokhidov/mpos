declare interface Provider {
  provider: string;
  providerId: string;
  email: string;
  name: string;
  picture: string;
}

declare type UserRole = 'waiter' | 'chef' | 'admin';
declare type Language = 'en' | 'ru' | 'uz';
declare type Region =
  | 'Samarkand'
  | 'Bukhara'
  | 'Khiva'
  | 'Nukus'
  | 'Fergana'
  | 'Andijan'
  | 'Tashkent'
  | 'Termiz';
declare type TimeFormat = '12h' | '24h';
declare type DateFormat = 'DD-MM-YYYY' | 'MM-DD-YYYY' | 'YYYY-MM-DD';

declare interface UserSettings {
  language: Language;
  region: Region;
  timeFormat: TimeFormat;
  dateFormat: DateFormat;
  notifications: {
    productUpdated: boolean;
    statusOrder: boolean;
  };
  email: {
    dailyDigest: boolean;
  };
}

declare interface User {
  _id?: string;
  firstname?: string;
  lastname?: string;
  profilePicture?: string;
  role?: UserRole;
  email: string;
  linkedAccounts?: Provider[];
  phoneNumber?: string;
  password?: string;
  settings?: UserSettings;
  resetOTP?: string;
  resetOTPExpires?: string;
  isOTPVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
