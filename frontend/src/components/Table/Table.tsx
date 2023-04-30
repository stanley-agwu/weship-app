import { FunctionComponent } from 'react';
import styles from './Table.module.scss';
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

const Table: FunctionComponent<TableProps> = ({ deliveries }) => {
  const table = useReactTable({
    data: deliveries,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className={styles.headerRow} key={headerGroup.id}>
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
            <tr className={styles.bodyRow} key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
