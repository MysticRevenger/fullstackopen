import { useState } from "react";
import PersonForm from "./Components/PersonForm";
import Person from "./Components/Person";
import Search from "./Components/Search";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "0335322381" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
  const nameRegex = /^[A-Za-z]+$/;

  const addNewPerson = (e) => {
    e.preventDefault();
    const personObj = {
      name: newName,
      phone: newPhone,
    };
    if (personObj.name === "" || personObj.phone === "")
      alert("Pls write full infomation");
    else if (!nameRegex.test(personObj.name)) alert("Not a valid name!");
    else if (!phoneRegex.test(personObj.phone))
      alert("Not a valid phone number!");
    else if (persons.find((person) => person.name === personObj.name))
      alert(`${personObj.name} is already added to phonebook`);
    else {
      setPersons(persons.concat(personObj));
      setNewName("");
      setNewPhone("");
    }
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setNewPhone(e.target.value);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />
      <Search searchQuery={searchQuery} handleSearch={handleSearch} />
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          <Person key={person.name} name={person.name} phone={person.phone} />
        ))}
      </ul>
    </div>
  );
};

export default App;
