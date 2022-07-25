import Person from "./Person"

const Persons = ({ personsToShow, handleDeletePerson }) => (
    personsToShow.map(person =>
      <Person
      id={person.id} 
      key={person.id} 
      name={person.name} 
      number={person.number}
      handleDeletePerson={() => handleDeletePerson(person)}
      />)
  )

export default Persons