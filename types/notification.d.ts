declare type NotificationStatus = 'unread' | 'read';
declare type NotificationType = 'product_update' | 'order_status' | 'system';

declare interface Notification {
  _id?: string;
  user: string;
  title: string;
  message: string;
  status: NotificationStatus;
  type: NotificationType;
  createdAt?: Date;
  updatedAt?: Date;
}
