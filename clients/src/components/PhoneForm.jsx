import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";

import { EDIT_NUMBER } from "../queries";

const PhoneForm = ({ setError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [changeNumber, result] = useMutation(EDIT_NUMBER);

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError("person not found");
    }
  }, [result.data]);

  const submit = (event) => {
    event.preventDefault();

    changeNumber({ variables: { name, phone } });

    setName("");
    setPhone("");
  };

  return (
    <div className="person-form">
      <form onSubmit={submit}>
        <div className="form-header">
          <h2 className="form-title">Edit number</h2>
          <button type="submit" className="form-btn">
            Save
          </button>
        </div>
        <div className="form-field">
          <div className="icon"></div>
          <input
            value={name}
            placeholder="Name"
            onChange={({ target }) => setName(target.value)}
            className="input-field"
          />
        </div>
        <div className="form-field">
          <div className="icon"></div>
          <input
            value={phone}
            placeholder="Phone"
            onChange={({ target }) => setName(target.value)}
            className="input-field"
          />
        </div>
      </form>
    </div>
  );
};

export default PhoneForm;
