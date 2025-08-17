'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/TransactionSuccessDialog';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import icons from '@/public/icons';
import Image from 'next/image';
import { Input } from '../ui/input';
import { DataTablePagination } from './DataTablePagination';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { DateRangePicker } from '../ui/date-range-picker';
import { exportToCSV, exportToExcel, exportToPDF } from '@/lib/exportUtils';
import { twMerge } from 'tailwind-merge';
import { Button } from '../ui/button';
import { formatDateWithTime } from '@/lib/dateUtils';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [orderDetails, setOrderDetails] = useState<Record<string, string> | null>(null);
  const [open, setOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col gap-3 border border-grey-100 p-2.5 rounded-[6px] h-full overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-3">
        <div className="flex flex-col items-start gap-y-1.5 w-full lg:w-auto">
          <h3 className="text-2xl lg:text-4xl text-base-black">Recent Transaction</h3>
          <p className="text-sm lg:text-base text-grey-600">
            Be a good and honest employee for everyone's happiness
          </p>
        </div>
        <div className="grid grid-cols-1 lg:flex items-center gap-3 w-full lg:w-auto">
          <DateRangePicker
            onUpdate={(values) =>
              table
                .getColumn('createdAt')
                ?.setFilterValue(
                  values.range.from && values.range.to
                    ? [values.range.from.toISOString(), values.range.to.toISOString()]
                    : undefined,
                )
            }
            initialDateFrom={
              new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            }
            initialDateTo={new Date().toISOString().split('T')[0]}
            align="start"
            locale="en-GB"
            showCompare={false}
          />
          <div className="w-full relative lg:max-w-[350px] md:col-start-1 md:row-start-2 md:col-span-2">
            <Image
              src={icons.search1}
              alt="search"
              width={20}
              height={20}
              className="absolute top-1/2 -translate-y-1/2 left-3"
            />
            <Input
              placeholder="Search Transaction"
              value={(table.getColumn('fullname')?.getFilterValue() as string) ?? ''}
              onChange={(event) => {
                table.getColumn('fullname')?.setFilterValue(event.target.value);
              }}
              className="pl-9 border-grey-200 w-full lg:w-[300px]"
            />
          </div>
          <div className="self-stretch w-px my-2.5 bg-grey-200 hidden lg:flex" />
          <DropdownMenu>
            <DropdownMenuTrigger className="px-2.5 h-[42px] rounded-[6px] border border-grey-200 flex items-center gap-x-3 cursor-pointer">
              <span>Export</span>
              <ChevronDown width={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="" align="end">
              <DropdownMenuItem
                onClick={() =>
                  exportToPDF(
                    data,
                    ['_id', 'fullname', 'createdAt', 'typeService', 'totalPrice', 'status'],
                    `transactions-${new Date().toISOString().split('T')[0]}`,
                  )
                }
              >
                PDF
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  exportToExcel(data, `transactions-${new Date().toISOString().split('T')[0]}`)
                }
              >
                EXCEL
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  exportToCSV(data, `transactions-${new Date().toISOString().split('T')[0]}`)
                }
              >
                CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader className="flex justify-center w-full">
            <DialogTitle className="flex flex-col items-center gap-y-[30px]">
              <Image src="/images/logo-light.svg" width={81} height={30} alt="logo" />
              <span className="text-center text-4xl font-satoshi font-normal">
                Thank’s For Your Order
              </span>
            </DialogTitle>
            <DialogDescription className="text-center mx-auto text-sm max-w-[200px]">
              Be a good and honest employee for everyone's happiness
            </DialogDescription>
            <div className="flex flex-col gap-y-10">
              <div className="mt-6 flex flex-col items-start gap-y-2.5">
                <h4 className="text-base font-medium">Detail Transaction</h4>
                <div className="flex flex-col gap-y-4 w-full">
                  {orderDetails &&
                    Object.entries(orderDetails).map(([key, value]) => (
                      <div className="flex justify-between items-center w-full" key={key}>
                        <h5 className="font-satoshi text-base text-grey-600">{key}</h5>
                        <p
                          className={twMerge(
                            'font-satoshi',
                            key === 'Status'
                              ? [
                                  'py-1 px-2.5 rounded-full capitalize text-sm',
                                  value === 'completed'
                                    ? 'bg-success-50 text-success-600'
                                    : value === 'pending'
                                      ? 'bg-warning-50 text-warning-600'
                                      : value === 'declined'
                                        ? 'bg-error-50 text-error-600'
                                        : 'text-base-black bg-grey-100',
                                ].join(' ')
                              : 'text-base-black text-base',
                          )}
                        >
                          {String(value)}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-3 items-center">
                <Button
                  className="h-9 border border-base-black hover:bg-base-white cursor-pointer rounded-[6px] bg-base-white hover:opacity-50 text-base-black"
                  onClick={() => setOpen(false)}
                >
                  Receive
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  className="h-9 border-base-black border cursor-pointer rounded-[6px] bg-base-black text-base-white"
                >
                  Okay
                </Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col gap-y-4 border border-[#DCDCDC] rounded-[6px] p-2.5 h-full overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-lg">Transactions</h3>
        </div>
        <ScrollArea className="w-full overflow-hidden h-full pr-4">
          <ScrollBar orientation="horizontal" />
          <div className="py-4">
            <Table className="rounded-2xl px-3">
              <TableHeader className="py-3 h-12">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="first:rounded-tl-2xl last:rounded-tr-2xl first:pl-4  bg-grey-50"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className="h-12"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="first:pl-4"
                          onClick={() => {
                            if (cell.column.id === 'Action') {
                              const transaction = row.original as Transaction;
                              const details = {
                                'Transaction ID': transaction._id || '',
                                Date:
                                  (transaction.createdAt &&
                                    formatDateWithTime(new Date(transaction.createdAt))) ||
                                  '',
                                'Type Services': transaction?.typeService,
                                Total:
                                  (transaction?.totalPrice &&
                                    `$${transaction.totalPrice.toFixed(2)}`) ||
                                  '',
                                Status: transaction?.status,
                              };
                              setOrderDetails(details);
                              setOpen(true);
                            }
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      Transactions are not available!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
