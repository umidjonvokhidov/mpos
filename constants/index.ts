import icons from "@/public/icons";

export const features: FeatureType[] = [
  {
    image: '/images/weekly-statistics.png',
    title: 'Track Your Weekly Balance',
    description:
      'Monitor your weekly earnings and stay on top of your business finances with clear, visual insights.',
  },
  {
    image: '/images/order-card.png',
    title: 'Real-Time Order & Income Overview',
    description:
      'Instantly view your order status, total orders, and income to make informed business decisions every day.',
  },
  {
    image: '/images/transaction-card.png',
    title: 'Seamless Order Completion',
    description:
      'Ensure customer satisfaction with smooth order processing and instant confirmation for every transaction.',
  },
  {
    image: '/images/statistics.png',
    title: 'Track your business growth with intuitive analytics.',
    description: 'Access your dashboard and stay updated with real-time insights.',
  },
];

export const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/' },
  { name: 'Product', path: '/products' },
  { name: 'Transaction', path: '/transactions' },
  { name: 'Report', path: '/reports' },
];

export const notifications: NotificationType[] = [
  {
    id: 1,
    title: 'The Payment Purwa is Success',
    description: 'You can add components to your app using the cli.',
    status: 'Success',
    read: false,
  },
  {
    id: 2,
    title: 'The Payment Rudi is Success',
    description: 'You can add components to your app using the cli.',
    status: 'Success',
    read: false,
  },
  {
    id: 3,
    title: 'The Payment Rudi is Pending',
    description: 'You can add components to your app using the cli.',
    status: 'Pending',
    read: false,
  },
  {
    id: 4,
    title: 'The Payment Dina is Pending',
    description: 'You can add components to your app using the cli.',
    status: 'Pending',
    read: false,
  },
  {
    id: 5,
    title: 'The Payment Rifqi is Pending',
    description: 'You can add components to your app using the cli.',
    status: 'Pending',
    read: true,
  },
  {
    id: 6,
    title: 'The Payment Deni is Pending',
    description: 'You can add components to your app using the cli.',
    status: 'Pending',
    read: true,
  },
];

export const statistics: StatisticType[] = [
  {
    key: 'orderProcess',
    icon: icons.box3,
    title: 'Order Process',
    value: 5,
    change: '0,5%',
    changePositive: true,
    subValue: 1.300,
    currency: false,
    viewAllPath: '/orders/process',
  },
  {
    key: 'totalOrder',
    icon: icons.bagJob,
    title: 'Total Order',
    value: 120,
    subValue: 521.00,
    currency: true,
    viewAllPath: '/orders',
  },
  {
    key: 'orderDone',
    icon: icons.box5,
    title: 'Order Done',
    value: 40,
    subValue: 521.00,
    currency: true,
    viewAllPath: '/orders/done',
  },
  {
    key: 'totalIncome',
    icon: icons.dolar,
    title: 'Total Income',
    value: '$1.200,00',
    change: '0,5%',
    changePositive: true,
    subValue: 1.234,
    currency: true,
    viewAllPath: '/income',
  },
];
