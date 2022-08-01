import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyword, setNewKeyword] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [popup, setPopup] = useState(null)
  

  const getPersons = () => {
      personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }

  const addPerson = event => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook. Replace the old number?`)
      changeNumber(personObject)
    } else {
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
        console.log(response)
        setPopup(`added ${newName}`)
        setTimeout(() => {
          setPopup(null)
        }, 1000)
      })     
      .catch(error => {
        console.log(error.response.data)
      })
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

  const handleDeletePerson = person => {
    if (window.confirm('Are you sure?')) {
      console.log(person)
      personService
      .deletePerson(person.id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== person.id))
        setPopup(`Removed ${person.name}`)
        setTimeout(() => {
          setPopup(null)
        }, 1000)
      })
    }
  }

  const changeNumber = newPerson => {
    console.log(newPerson)
    const person = persons.find(p => p.name === newPerson.name)
    console.log(person)
    const changedPerson = {...person, number : newPerson.number}
    console.log(changedPerson)
    personService
      .update(changedPerson.id, changedPerson)
      .then(response => {
        setPersons(persons.map(p => p.id !== changedPerson.id ? p : changedPerson))
        setPopup(`Changed ${changedPerson.name}`)
        setTimeout(() => {
          setPopup(null)
        }, 1000)
      })
      .catch(error => {
        setPopup(`Information of ${changedPerson.name} has already been removed from server`)
        setPersons(persons)
        setTimeout(() => {
          setPopup(null)
        }, 1000 )
      })
      setNewName('')
      setNewNumber('')
  }

  useEffect(getPersons, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={popup} />
      <Filter keyword={keyword} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} changeNumber={changeNumber}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDeletePerson={handleDeletePerson} />
    </div>
  )

}

export default App