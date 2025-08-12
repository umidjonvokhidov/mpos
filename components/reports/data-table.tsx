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
import DateTime from '../DateTime';
import { DateRangePicker } from '../ui/date-range-picker';
import { exportToCSV, exportToExcel, exportToPDF } from '@/lib/exportUtils';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
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
        <div className="flex flex-col items-start gap-y-1.5">
          <h3 className="text-4xl text-base-black">Report your Finance</h3>
          <p className="text-base text-grey-600">
            Be a good and honest employee for everyone's happiness
          </p>
        </div>
        <div className="flex items-center gap-x-3">
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
            initialDateFrom={new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
            initialDateTo={new Date().toISOString().split('T')[0]}
            align="start"
            locale="en-GB"
            showCompare={false}
          />
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
      <div className="flex flex-col gap-y-4 border border-[#DCDCDC] rounded-[6px] p-2.5 h-full overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-lg">Sales Result Report</h3>
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
