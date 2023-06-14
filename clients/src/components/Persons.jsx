import { useState } from "react";
import { useQuery } from "@apollo/client";
import { FIND_PERSON } from "../queries";
import "../App.css";
import PhoneForm from "./PhoneForm";

const Person = ({ person, onClose, onEditPhone, showPhoneForm }) => {
  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div className="person-modal">
      <div className="person-modal-content" style={{ padding: "15px 30px" }}>
        <div className="form-header">
          <div className="form-title" onClick={onClose}>
            &larr;
          </div>
          <button className="nav-icon" onClick={onEditPhone}>
            &rarr;
          </button>
        </div>
        {showPhoneForm && <PhoneForm setError={notify} />}
        <div className="p-column">
          <div className="p-icon"></div>
          <h2 className="p-name">
            {/* {person.name} */}
            Arto Hellas
          </h2>
          <div className="p-address">
            Tapiolankatu 5 A, Espoo
            {/* {person.address.street}, {person.address.city} */}
          </div>
          <div className="p-address">{/* {person.phone} */}040-123543</div>
        </div>
      </div>
    </div>
  );
};

const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  if (nameToSearch && result.data) {
    return (
      <Person
        person={result.data.findPerson}
        onClose={() => setNameToSearch(null)}
        showPhoneForm={showPhoneForm}
        onEditPhone={() => setShowPhoneForm((prevShow) => !prevShow)}
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
