const Person = ({ name, number, handleDeletePerson, id }) => 
    <p>{name} {number}  <button id={id} onClick={handleDeletePerson}>delete</button></p>

export default Person