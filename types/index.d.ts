declare interface FeatureType {
  image: string;
  title: string;
  description: string;
}

declare type NavItem = {
  name: string;
  path: string;
};

declare interface ProductFormValues {
  image?: File;
  imageUrl?: string;
  stock: boolean;
  category: string;
  name: string;
  price: number;
}

declare interface NotificationType {
  id: number;
  title: string;
  description: string;
  status: 'Success' | 'Pending';
  read: boolean;
}

declare interface StatisticType {
  key: string;
  icon: string;
  title: string;
  value: number | string;
  change?: string;
  changePositive?: boolean;
  subValue: number;
  currency: boolean;
  viewAllPath: string;
}
