import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PERSON, ALL_PERSONS } from "../queries";
import { FaPhoneAlt, FaUserAlt, FaHome } from "react-icons/fa";

const PersonForm = ({ setError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      const messages = error.graphQLErrors[0].message;
      setError(messages);
    },
  });

  const submit = (event) => {
    event.preventDefault();

    createPerson({ variables: { name, phone, street, city } });

    setName("");
    setPhone("");
    setStreet("");
    setCity("");
  };

  return (
    <div className="person-form">
      <form onSubmit={submit}>
        <div className="form-header">
          <h2 className="form-title">Create new</h2>
          <button type="submit" className="form-btn">
            Save
          </button>
        </div>
        <div className="form-field">
          <div className="icon"><FaUserAlt /></div>
          <input
            value={name}
            placeholder="First and Last Name"
            onChange={({ target }) => setName(target.value)}
            className="input-field"
          />
        </div>
        <div className="form-field">
          <div className="icon"><FaPhoneAlt/></div>
          <input
            value={phone}
            placeholder="Phone"
            onChange={({ target }) => setPhone(target.value)}
            className="input-field"
          />
        </div>
        <div className="form-field">
          <div className="icon"><FaHome /></div>
          <div className="form-column">
            <input
              value={street}
              placeholder="Street"
              onChange={({ target }) => setStreet(target.value)}
              className="input-field"
            />
            <input
              value={city}
              placeholder="City"
              onChange={({ target }) => setCity(target.value)}
              className="input-field"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
