import { columns } from './columns';
import { DataTable } from './data-table';

async function getData(): Promise<TransactionsTable[]> {
  // Fetch data from your API here.
  return [
    {
      id: '21239172AKS231',
      customer: 'Customer 1',
      type: 'Purchase',
      total: 100.0,
      status: 'Completed',
    },
    {
      id: '21239172AKS231',
      customer: 'Customer 1',
      type: 'Purchase',
      total: 100.0,
      status: 'Completed',
    },
    {
      id: '21239172AKS231',
      customer: 'Customer 1',
      type: 'Purchase',
      total: 100.0,
      status: 'Completed',
    },
    {
      id: '21239172AKS231',
      customer: 'Customer 1',
      type: 'Purchase',
      total: 100.0,
      status: 'Completed',
    },
    {
      id: '21239172AKS231',
      customer: 'Customer 1',
      type: 'Purchase',
      total: 100.0,
      status: 'Completed',
    },
    {
      id: '21239172AKS231',
      customer: 'Customer 1',
      type: 'Purchase',
      total: 100.0,
      status: 'Completed',
    },
    {
      id: '21239172AKS231',
      customer: 'Customer 1',
      type: 'Purchase',
      total: 100.0,
      status: 'Completed',
    },
    {
      id: '21239172AKS231',
      customer: 'Customer 1',
      type: 'Purchase',
      total: 100.0,
      status: 'Completed',
    },
    {
      id: '21239172AKS231',
      customer: 'Customer 1',
      type: 'Purchase',
      total: 100.0,
      status: 'Completed',
    },
    {
      id: '21239185AKS232',
      customer: 'Customer 2',
      type: 'Refund',
      total: 110.0,
      status: 'Pending',
    },
    {
      id: '21239198AKS233',
      customer: 'Customer 3',
      type: 'Purchase',
      total: 120.0,
      status: 'Declined',
    },
    {
      id: '21239211AKS234',
      customer: 'Customer 4',
      type: 'Refund',
      total: 130.0,
      status: 'Completed',
    },
    {
      id: '21239224AKS235',
      customer: 'Customer 5',
      type: 'Purchase',
      total: 140.0,
      status: 'Pending',
    },
    {
      id: '21239237AKS236',
      customer: 'Customer 6',
      type: 'Refund',
      total: 150.0,
      status: 'Declined',
    },
    {
      id: '21239250AKS237',
      customer: 'Customer 7',
      type: 'Purchase',
      total: 160.0,
      status: 'Completed',
    },
    {
      id: '21239263AKS238',
      customer: 'Customer 8',
      type: 'Refund',
      total: 170.0,
      status: 'Pending',
    },
    {
      id: '21239276AKS239',
      customer: 'Customer 9',
      type: 'Purchase',
      total: 180.0,
      status: 'Declined',
    },
    {
      id: '21239289AKS240',
      customer: 'Customer 10',
      type: 'Refund',
      total: 190.0,
      status: 'Completed',
    },
  ];
}

const RecentTransactions = async () => {
  const data = await getData();
  return <DataTable columns={columns} data={data} />;
};

export default RecentTransactions;
