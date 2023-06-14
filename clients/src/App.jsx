import { useState } from "react";
import { useQuery } from "@apollo/client";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import NavBar from "./components/Navbar";
import Notify from "./components/Notify";
import { ALL_PERSONS } from "./queries";
import './App.css'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [showForm, setShowForm] = useState(false)

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
      <NavBar addPhone={() => setShowForm(prevShow => !prevShow)} show={showForm} />
      {showForm && <PersonForm setError={notify} />}
      {showForm ? null : <Persons persons={result.data.allPersons} />}
    </div>
  );
}

export default App;
