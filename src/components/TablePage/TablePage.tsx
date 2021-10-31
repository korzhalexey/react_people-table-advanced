import { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ClipLoader from 'react-loader-spinner';
import getPeople from '../../api/people';
import Table from '../Table/Table';
import { ITable } from '../../interfaces';

import './TablePage.scss';

import {
  TABLE_NAME,
  TABLE_SEX,
  TABLE_BORN,
  TABLE_DIED,
  ASCENDING,
} from '../../commonStrings';

const TablePage = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';
  const [table, setTable] = useState<ITable[]>();
  const [tableFromServer, setTableFromServer] = useState<ITable[]>();
  const headerFromUrl = searchParams.get('sorted_by') || '';
  const sortingOrder = searchParams.get('sorting_order') || '';

  const sortTable = (filteredTable?: ITable[]) => {
    let sortedTable: ITable[] = [];

    if (filteredTable) {
      sortedTable = [...filteredTable];
    } else if (table) {
      sortedTable = [...table];
    }

    if (sortedTable) {
      sortedTable?.sort((person: ITable, nextPerson: ITable) => {
        if (headerFromUrl === TABLE_NAME || headerFromUrl === TABLE_SEX) {
          return sortingOrder === ASCENDING
            ? person[headerFromUrl].localeCompare(nextPerson[headerFromUrl])
            : nextPerson[headerFromUrl].localeCompare(person[headerFromUrl]);
        }

        if (headerFromUrl === TABLE_BORN || headerFromUrl === TABLE_DIED) {
          return sortingOrder === ASCENDING
            ? person[headerFromUrl] - nextPerson[headerFromUrl]
            : nextPerson[headerFromUrl] - person[headerFromUrl];
        }

        return 0;
      });

      setTable(sortedTable);
    }
  };

  useEffect(() => {
    getPeople().then(setTableFromServer);

    sortTable();
  }, []);

  useEffect(() => {
    if (query) {
      const lowerQuery = query.toLowerCase();
      const filteredTable = tableFromServer?.filter(person => (
        person.name.toLowerCase().includes(lowerQuery)
        || person.fatherName?.toLowerCase().includes(lowerQuery)
        || person.motherName?.toLowerCase().includes(lowerQuery)
      ));

      setTable(filteredTable);
      sortTable(filteredTable);
    } else {
      setTable(tableFromServer);
      sortTable(tableFromServer);
    }
  }, [tableFromServer, query]);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      searchParams.set('query', event.target.value);
    } else {
      searchParams.delete('query');
    }

    history.push(`?${searchParams.toString()}`);
  };

  useEffect(() => {
    sortTable();
  }, [headerFromUrl, sortingOrder]);

  return (
    <>
      <h1>People page</h1>

      {
        table ? (
          <>
            <input
              type="text"
              placeholder="Filter"
              value={query}
              onChange={handleQueryChange}
            />

            {
              table.length > 0 ? (
                <Table
                  table={table}
                />
              ) : (
                <article className="message">
                  <div className="message__body">
                    <p>Nothing was found</p>
                  </div>
                </article>
              )
            }
          </>
        ) : (
          <div className="loader">
            <ClipLoader
              type="Circles"
              color="#039"
              height={100}
              width={100}
            />
          </div>
        )
      }
    </>
  );
};

export default TablePage;
