import axios from 'axios'
import { useState, useEffect } from 'react'

const Person = ({ name, number }) => <p>{name} {number}</p>

const Filter = ({ keyword, handleFilterChange }) => (
  <div>filter shown with <input value={keyword} onChange={handleFilterChange} /></div>
)

const PersonForm = ({addPerson, newName, handlePersonChange, newNumber, handleNumberChange}) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handlePersonChange} />
    </div>
    <div>
      number : <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ personsToShow }) => (
  personsToShow.map(person =>
    <Person key={person.name} name={person.name} number={person.number} />)
)

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyword, setNewKeyword] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(keyword.toLowerCase()))

  const handlePersonChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = event => {
    setShowAll(false)
    setNewKeyword(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter keyword={keyword} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )

}

export default App