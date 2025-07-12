import type { Types } from "mongoose";

export type NotificationStatus = "unread" | "read";
export type NotificationType = "product_update" | "order_status" | "system";

export interface Notification {
  _id?: string;
  user: string;
  title: string;
  message: string;
  status: NotificationStatus;
  type: NotificationType;
  createdAt?: Date;
  updatedAt?: Date;
}
