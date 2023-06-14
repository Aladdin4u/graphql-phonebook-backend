import { useState } from "react";
import { useQuery } from "@apollo/client";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import PhoneForm from "./components/PhoneForm";
import { ALL_PERSONS } from "./queries";
import './App.css'
import NavBar from "./components/Navbar";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [showForm, setShowForm] = useState(false)
  const [data, setData] = useState([
    {
      name: "Arto Hellas",
      phone: "040-123543",
      street: "Tapiolankatu 5 A",
      city: "Espoo",
      id: "3d594650-3436-11e9-bc57-8b80ba54c431",
    },
    {
      name: "Matti Luukkainen",
      phone: "040-432342",
      street: "Malminkaari 10 A",
      city: "Helsinki",
      id: "3d599470-3436-11e9-bc57-8b80ba54c431",
    },
    {
      name: "Venla Ruuska",
      street: "Nallemäentie 22 C",
      city: "Helsinki",
      id: "3d599471-3436-11e9-bc57-8b80ba54c431",
    },
  ])

  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div className="container">
      <Notify errorMessage={errorMessage} />
      <NavBar onShow={() => setShowForm(prevShow => !prevShow)} />
      <Persons persons={data} />
      {/* <Persons persons={result.data.allPersons} /> */}
      {showForm && <PersonForm setError={notify} />}
      <PhoneForm setError={notify} />
    </div>
  );
};

export default App;
