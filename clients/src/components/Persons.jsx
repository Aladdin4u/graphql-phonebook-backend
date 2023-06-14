import { useState } from "react";
import { useQuery } from "@apollo/client";
import { FIND_PERSON } from "../queries";
import "../App.css";

const Person = ({ person, onClose }) => {
  return (
    <div>
      <h2>
        {/* {person.name} */}
      Arto Hellas</h2>
      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>{person.phone}</div>
      <button onClick={onClose}>close</button>
    </div>
  );
};

const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null);
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  if (nameToSearch && result.data) {
    return (
      <Person
        person={result.data.findPerson}
        onClose={() => setNameToSearch(null)}
      />
    );
  }

  return (
    <div className="person-container">
      <div className="person-nav">
        <ul className="person-ul">
          <li className="person-nav-li">Recents</li>
          <li className="person-nav-li">Favourite</li>
          <li className="person-nav-li">Missed</li>
        </ul>
      </div>
      <div className="person-list">
        {persons.map((p) => (
          <div key={p.name} className="person">
            <div className="p-left">
              <div className="p-icon">{p.phone ? p.name[0] : ""}</div>
              {p.name}
            </div>
            <button onClick={() => setNameToSearch(p.name)}>
              show address
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Persons;
