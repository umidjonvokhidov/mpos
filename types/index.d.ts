declare interface FeatureType {
  image: string;
  title: string;
  description: string;
}

declare type NavItem = {
  name: string;
  path: string;
};

declare interface NotificationType {
  id: number;
  title: string;
  description: string;
  status: 'Success' | 'Pending';
  read: boolean;
}
