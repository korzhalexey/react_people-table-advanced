import { FC } from 'react';
import TableHead from '../TableHead/TableHead';
import TableBody from '../TableBody/TableBody';
import { ITable } from '../../interfaces';

import './Table.scss';

interface ITableComponent {
  table: ITable[]
}

const Table: FC<ITableComponent> = ({ table }) => (
  <table>
    <TableHead />

    <TableBody
      table={table}
    />
  </table>
);

export default Table;
