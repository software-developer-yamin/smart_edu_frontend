'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { IPayment } from '../../../../../services/payment/payment.type';

export const columns: ColumnDef<IPayment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'studentId',
    header: 'Student Id'
  },
  {
    accessorKey: 'transactionId',
    header: 'Transaction Id'
  },
  {
    accessorKey: 'class',
    header: 'Class'
  },
  {
    accessorKey: 'month',
    header: 'Month'
  },
  {
    accessorKey: 'amount',
    header: 'Amount'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
