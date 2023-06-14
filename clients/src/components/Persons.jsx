import { useState } from "react";
import { useQuery } from "@apollo/client";
import { FIND_PERSON } from "../queries";
import "../App.css";
import PhoneForm from "./PhoneForm";
import Notify from "./Notify";
import { FaUserAlt, FaUserEdit } from "react-icons/fa";
import { AiOutlineMore } from "react-icons/ai";
import { HiChevronLeft, HiOutlinePlusSm, HiOutlineX } from "react-icons/hi";

const Person = ({ person, onClose, onEditPhone, showPhoneForm }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const color = showPhoneForm ? "red" : "blue";
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
            <HiChevronLeft />
          </div>
          <button
            className="nav-icon"
            onClick={onEditPhone}
            style={{ backgroundColor: color }}
          >
            {showPhoneForm ? <HiOutlineX /> : <FaUserEdit />}
          </button>
        </div>
        <Notify errorMessage={errorMessage} />
        {showPhoneForm && <PhoneForm setError={notify} />}
        {showPhoneForm ? null : (
          <div className="p-column">
            <div className="p-icon">
              {person.phone ? person.name[0] : <FaUserAlt />}
            </div>
            <h2 className="p-name">{person.name}</h2>
            <div className="p-address">
              {person.address.street}, {person.address.city}
            </div>
            <div className="p-address">{person.phone}</div>
          </div>
        )}
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
              <div className="p-icon">
                {p.phone ? p.name[0] : <FaUserAlt />}
              </div>
              {p.name}
            </div>
            <div onClick={() => setNameToSearch(p.name)} style={{color: "white"}}>
              <AiOutlineMore />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Persons;
