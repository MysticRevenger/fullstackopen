import React from 'react'

const PersonForm = ({addNewPerson, newName, newPhone, handleNameChange, handlePhoneChange}) => {
  return (
    <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm