import React from 'react';
import './Table.scss';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { TableDelivery } from '../../types.ts';

const columnHelper = createColumnHelper<TableDelivery>();

const columns = [
  columnHelper.accessor((row) => row.customerName, {
    id: 'customerName',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Customer Name</span>,
  }),
  columnHelper.accessor((row) => row.deliveryDate, {
    id: 'deliveryDate',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Delivery Date</span>,
  }),
  columnHelper.accessor((row) => row.warehouseAddress, {
    id: 'warehouseAddress',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Warehouse Address</span>,
  }),
  columnHelper.accessor((row) => row.deliveryAddress, {
    id: 'deliveryAddress',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Delivery Address</span>,
  }),
  columnHelper.accessor((row) => row.createdAt, {
    id: 'createdAt',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Date Created</span>,
  }),
  columnHelper.accessor((row) => row.updatedAt, {
    id: 'updatedAt',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Date Updated</span>,
  }),
];

export type TableProps = {
  deliveries: TableDelivery[];
};

const Table = ({ deliveries }: TableProps) => {
  const [data, setData] = React.useState(() => [...deliveries]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
