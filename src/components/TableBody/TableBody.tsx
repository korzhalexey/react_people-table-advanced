import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';
import cn from 'classnames';
import PersonRow from '../PersonRow/PersonRow';
import { ITable } from '../../interfaces';

interface ITableBody {
  table: ITable[],
}

const TableBody: FC<ITableBody> = ({ table }) => {
  const { pathname } = useLocation();
  const slug = pathname.slice(pathname.lastIndexOf('/') + 1);

  return (
    <tbody>
      {
        table?.map((person) => (
          <tr
            key={nanoid()}
            className={cn({
              'selected-row': slug === person.slug,
            })}
          >
            <PersonRow
              person={person}
              table={table}
            />
          </tr>
        ))
      }
    </tbody>
  );
};

export default TableBody;
