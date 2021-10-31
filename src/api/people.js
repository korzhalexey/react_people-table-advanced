const getPeople = () => (
  fetch('https://mate-academy.github.io/react_people-table/api/people.json')
    .then(response => response.json())
    .then(people => people.map(child => ({
      ...child,
      mother: people.find(mother => mother.name === child.motherName),
      father: people.find(father => father.name === child.fatherName),
    })))
    .catch(error => error)
);

export default getPeople;
