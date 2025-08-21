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
import TrailLoading from '@/public/lotties/TrailLoading.json';

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
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '../ui/input';
import { DataTablePagination } from './DataTablePagination';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import Lottie from 'lottie-react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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
        <div className="flex items-center gap-3 w-full lg:max-w-[350px]">
          <Select
            onValueChange={(value) => {
              table.getColumn('status')?.setFilterValue(value === 'allTransaction' ? '' : value);
            }}
            value={table.getColumn('status')?.getFilterValue() as string}
          >
            <SelectTrigger className="w-full border-neutral-grey-300 rounded-[6px]">
              <SelectValue placeholder="All Transaction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="allTransaction">All Transaction</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => {
              table.getColumn('typeService')?.setFilterValue(value === 'allCategory' ? '' : value);
            }}
            value={table.getColumn('typeService')?.getFilterValue() as string}
          >
            <SelectTrigger className="w-full border-neutral-grey-300 rounded-[6px]">
              <SelectValue placeholder="All Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="allCategory">All Category</SelectItem>
              <SelectItem value="Delivery">Delivery</SelectItem>
              <SelectItem value="Take Away">Take Away</SelectItem>
              <SelectItem value="Dine In">Dine In</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full relative lg:max-w-[350px]">
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
            className="pl-9"
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-4 h-full overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-lg">Recent Transaction</h3>
          <Link href="/transactions" className="text-sm font-normal text-blue-400">
            View all
          </Link>
        </div>
        <ScrollArea className="w-full overflow-hidden h-full pr-4">
          <ScrollBar orientation="horizontal" />
          <div className="py-4 h-full">
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
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="">
                      <Lottie
                        className="w-20 h-20 mx-auto"
                        animationData={TrailLoading}
                        loop={true}
                      />
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className="h-12"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="first:pl-4">
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
