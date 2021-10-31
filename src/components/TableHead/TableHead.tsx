import { FC } from 'react';
import { nanoid } from 'nanoid';
import { useHistory, useLocation } from 'react-router-dom';

import {
  TABLE_FATHER,
  TABLE_MOTHER,
  TABLE_NAME,
  TABLE_SEX,
  TABLE_BORN,
  TABLE_DIED,
  ASCENDING,
  DESCENDING,
} from '../../commonStrings';

const TableHead: FC = () => {
  const sortableHeaders = [
    TABLE_NAME,
    TABLE_SEX,
    TABLE_BORN,
    TABLE_DIED,
  ];

  const searchParams = new URLSearchParams(useLocation().search);
  const headerFromUrl = searchParams.get('sorted_by') || '';
  const history = useHistory();
  const sortingOrder = searchParams.get('sorting_order') || '';

  const columnHeaderHandler = (header: string) => {
    if (header === headerFromUrl) {
      searchParams.set(
        'sorting_order',
        sortingOrder === ASCENDING ? DESCENDING : ASCENDING,
      );
    } else {
      searchParams.set('sorted_by', header);
      searchParams.set('sorting_order', ASCENDING);
    }

    history.push(`?${searchParams.toString()}`);
  };

  return (
    <thead>
      <tr>
        {
          sortableHeaders.map((header) => (
            <th
              key={nanoid()}
              className="sortable"
              onClick={() => {
                columnHeaderHandler(header);
              }}
            >
              {header}
            </th>
          ))
        }
        <th>{TABLE_FATHER}</th>
        <th>{TABLE_MOTHER}</th>
      </tr>
    </thead>
  );
};

export default TableHead;
