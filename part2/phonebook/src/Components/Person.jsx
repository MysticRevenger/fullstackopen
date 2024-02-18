
const Person = ({ person, deletePerson }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div ><b>{person.name}</b>: {person.number}</div>
      <button onClick={() => deletePerson(person.id)}>Delete</button>
    </div>
  )
}

export default Person