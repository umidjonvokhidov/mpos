'use client';

import icons from '@/public/icons';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { Checkbox } from '../ui/checkbox';
import Link from 'next/link';

export const columns: ColumnDef<Transaction>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        className="border border-base-black size-4 cursor-pointer"
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="cursor-pointer border-grey-200"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    enableResizing: true,
  },
  {
    accessorKey: '_id',
    header: () => <div className="text-base-black text-base font-medium mr-6">Transaction ID</div>,
    cell: (info) => `${String(info.getValue()).toUpperCase()}`,
  },
  {
    accessorKey: 'fullname',
    header: ({ column }) => (
      <div
        className="text-base-black text-base font-medium mr-6 cursor-pointer flex items-center gap-x-2 group"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Customer</span>
        <Image
          src={icons.arrowUpDown1}
          alt="arrow-up-down"
          width={20}
          height={20}
          className="group-hover:visible invisible"
        />
      </div>
    ),
  },
  {
    accessorKey: 'typeService',
    header: ({ column }) => (
      <div
        className="text-base-black text-base font-medium mr-6 cursor-pointer flex items-center gap-x-2 group"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Service Type</span>
        <Image
          src={icons.arrowUpDown1}
          alt="arrow-up-down"
          width={20}
          height={20}
          className="group-hover:visible invisible"
        />
      </div>
    ),
  },
  {
    accessorKey: 'totalPrice',
    header: ({ column }) => (
      <div
        className="text-base-black text-base font-medium mr-6 cursor-pointer flex items-center gap-x-2 group"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Total Price</span>
        <Image
          src={icons.arrowUpDown1}
          alt="arrow-up-down"
          width={20}
          height={20}
          className="group-hover:visible invisible"
        />
      </div>
    ),
    cell: (info) => `$${Number(info.getValue()).toFixed(2)}`,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <div
        className="text-base-black text-base font-medium mr-6 cursor-pointer flex items-center gap-x-2 group"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Status</span>
        <Image
          src={icons.arrowUpDown1}
          alt="arrow-up-down"
          width={20}
          height={20}
          className="group-hover:visible invisible"
        />
      </div>
    ),
    cell: (info) => {
      const value = String(info.getValue() ?? '').toLowerCase();
      return (
        <span
          className={twMerge(
            'py-1 px-2.5 rounded-full capitalize',
            value === 'completed' && 'bg-success-50 text-success-600',
            value === 'pending' && 'bg-warning-50 text-warning-600',
            value === 'declined' && 'bg-error-50 text-error-600',
          )}
        >{`${value || '-'}`}</span>
      );
    },
  },
  {
    accessorKey: 'Action',
    header: ({ column }) => <span>Action</span>,
    cell: (info) => {
      return <Link href={String(info.getValue())} className='text-blue-400'>View Receipt</Link>;
    },
  },
];
