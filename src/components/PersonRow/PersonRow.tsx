import { PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ITable } from '../../interfaces';

interface IPersonRow {
  person: ITable,
  table: ITable[],
}

const PersonRow = ({ person, table }: PropsWithChildren<IPersonRow>) => {
  const {
    name,
    sex,
    born,
    died,
    mother,
    father,
    fatherName,
    motherName,
    slug,
  } = person;

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  return (
    <>
      <td>
        <Link
          className={sex === 'm' ? 'male' : 'female'}
          to={`/table/${slug}?${searchParams.toString()}`}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {
          table.find((personFather) => personFather.name === fatherName)
            ? (
              <Link
                to={`/table/${father?.slug}?${searchParams.toString()}`}
                className="male"
              >
                {fatherName}
              </Link>
            ) : (
              <span className="not-found">{fatherName}</span>
            )
        }
      </td>
      <td>
        {
          table.find((personMather) => personMather.name === motherName)
            ? (
              <Link
                to={`/table/${mother?.slug}?${searchParams.toString()}`}
                className="female"
              >
                {motherName}
              </Link>
            ) : (
              <span className="not-found">{motherName}</span>
            )
        }
      </td>
    </>
  );
};

export default PersonRow;
