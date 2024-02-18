import { useEffect, useState } from "react";
import phoneService from "./services/phoneService";
import PersonForm from "./Components/PersonForm";
import Person from "./Components/Person";
import Search from "./Components/Search";
import Notification from "./Components/Notification";
import { v4 as uuidv4 } from "uuid"

console.log(uuidv4());

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null)

  const numberRegex = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
  const nameRegex = /^[A-Za-z]+$/;


  useEffect(() => {
    phoneService
      .getAll()
      .then(persons => setPersons(persons))
      .catch(err => console.log(err))
  }, [])

  const addNewPerson = (e) => {
    e.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber,
      id: uuidv4(),
    };

    const checkPerson = persons.find(person =>
      person.name.toLowerCase() === personObj.name.toLowerCase())

    if (personObj.name === "" || personObj.number === "")
      alert("Pls write full infomation");
    else if (!nameRegex.test(personObj.name)) alert("Not a valid name!");
    else if (!numberRegex.test(personObj.number))
      alert("Not a valid phone number!");
    else if (checkPerson && checkPerson.number === newNumber)
      window.alert(`${personObj.name} is already added to phonebook`);
    else if (checkPerson && checkPerson.number !== newNumber) {
      const confirmNewNumber = window.confirm(`Are you sure you want update ${checkPerson.name}'s number with a new one?`)

      if (confirmNewNumber) {
        const personUpdate = { ...checkPerson, number: newNumber }
        phoneService
          .update(checkPerson.id, personUpdate)
          .then(returnedPerson => {
            setPersons(
              persons
                .map(person =>
                  person.id !== checkPerson.id
                    ? person
                    : returnedPerson
                )
            )
            setNotification({
              text: `${checkPerson.name}'s number was updated.`,
              type: 'notification'
            })
            setTimeout(() => setNotification(null), 5000)
          })
          .catch(error =>
            setPersons(persons
              .filter(person =>
                person.name !== checkPerson.name
              )
            )
          )
        setNotification({
          text: `${checkPerson.name} has already been deleted from the server.`,
          type: 'error'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    }
    else {
      phoneService
        .create(personObj)
        .then((personObj) => {
          setPersons(persons.concat(personObj));
          setNewName("");
          setNewNumber("");
        }
        )
        .catch(error => {
          setNotification({
            text: error.response.data.error,
            type: 'error'
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })

      setNotification({
        text: `${personObj.name} added to the phonebook.`,
        type: 'notification'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  };

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const confirmDelete = window.confirm(`Are you sure want to delete ${person.name}`)

    if (confirmDelete) {
      phoneService
        .remove(id)
      // .then(returnedPerson => {
      //   persons.map(person => person.id !== id ? person : returnedPerson)
      // }
      // )
      setPersons(persons.filter(person => person.id !== id))
      setNotification({
        text: `${person.name} was deleted from the phonebook.`,
        type: 'notification'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleNameChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setNewNumber(e.target.value);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        newPhone={newNumber}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />
      <Search searchQuery={searchQuery} handleSearch={handleSearch} />
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          <Person key={person.id} person={person} deletePerson={deletePerson} />
        ))}
      </ul>
    </div>
  );
};

export default App;
